class AccommodationsController < ApplicationController
  def index
    # It looks weird when using `.all` but adding paging like Pagy seems to be overkill
    render json: Accommodation.all.as_json
  end

  def optimal_options
    render json: AccommodationServices::OptimalOption.execute(params[:guest_count])
  end
end
