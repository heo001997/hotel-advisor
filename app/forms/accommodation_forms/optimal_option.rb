# frozen_string_literal: true

class AccommodationForms::OptimalOption
  include ActiveModel::Model
  include ActiveModel::Attributes

  # Help coerce attributes (new in Rails 7)
  attribute :guest_count, :integer

  validates :guest_count, presence: true, numericality: { only_integer: true, greater_than: 0 }
end
