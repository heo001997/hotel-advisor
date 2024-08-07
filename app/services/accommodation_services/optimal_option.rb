# frozen_string_literal: true

module AccommodationServices
  class OptimalOption
    class OptimalOptionException < StandardError; end

    def initialize(guest_count)
      @guest_count = guest_count
      @accommodations = Accommodation.all.order(sleeps: :desc)
      @optimal_option = Accommodation.room_types.transform_values{0}
    end

    def execute
      form = set_validate_form_with_coerce
      return form.slice(:errors) unless form.valid?
      return { formatted: "No option", raw: nil } if not_enough_sleeps?

      build_optimal_option(@guest_count)

      { formatted: format_result, raw: @optimal_option }
    rescue OptimalOptionException => e
      Rails.logger.error("OptimalOptionException error: #{e} with guest_count: #{guest_count}")
    end

    private

      def set_validate_form_with_coerce
        form = AccommodationForms::OptimalOption.new(guest_count: @guest_count)
        @guest_count = form.guest_count
        form
      end

      def build_optimal_option(curr_guest_count)
        match_accommodation = @accommodations.find do |accommodation|
          next if accommodation.room_count == 0
          next if accommodation.sleeps > curr_guest_count
          accommodation
        end
        raise OptimalOptionException.new("Unexpected no option") unless match_accommodation

        guest_count_left = curr_guest_count - match_accommodation.sleeps
        match_accommodation.room_count -= 1
        @optimal_option[match_accommodation.room_type] += 1

        build_optimal_option(guest_count_left) if guest_count_left > 0
      end

      def not_enough_sleeps?
        total_sleeps = @accommodations.sum{|accommodation| accommodation.sleeps * accommodation.room_count}
        @guest_count > total_sleeps
      end

      def format_result
        option = @optimal_option.map { |room_type, room_count| [room_type.capitalize] * room_count }.flatten.join(" ")
        total_price = @accommodations.sum{|accommodation| (@optimal_option[accommodation.room_type] * accommodation.price)}.to_i

        "#{option} - $#{total_price}"
      end
  end
end
