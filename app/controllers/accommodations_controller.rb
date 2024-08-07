# frozen_string_literal: true

class AccommodationsController < ApplicationController
  def index
    # It looks weird when using `.all` but adding paging like Pagy seems to be overkill
    render json: Accommodation.all.as_json
  end

  def optimal_options
    render json: AccommodationServices::OptimalOption.new(optimal_options_params[:guest_count]).execute
  end

  private

    def optimal_options_params
      params.permit(:guest_count)
    end
end
