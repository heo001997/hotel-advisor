# frozen_string_literal: true
require 'rails_helper'

RSpec.describe AccommodationServices::OptimalOption do
  fixtures :accommodations

  describe 'execute' do
    let(:accommodations) { Accommodation.all.order(sleeps: :desc) }
    subject(:result) { described_class.new(guest_count).execute }

    shared_examples 'success find optimal option' do
      it 'returns correct cheapest optimal option' do
        expect(result[:formatted]).to eq(expected_result)
      end

      it 'returns total_sleeps equal to guest_count' do
        total_sleeps = accommodations.sum { |accommodation| result[:raw][accommodation.room_type] * accommodation.sleeps }
        expect(total_sleeps).to eq(guest_count.to_i)
      end
    end

    describe 'guest_count is valid (an integer, 0 < guest_count <= 12)' do
      describe 'when guest_count = 12' do
        let(:guest_count) { 12 }
        let(:expected_result) { "Single Single Double Double Double Family - $295" }
      
        it_behaves_like 'success find optimal option'
      
        it 'returns multiple rooms with same type proposed' do
          expect(result[:raw].values.any? { |room_count| room_count > 1 }).to be_truthy
        end
      end
    end

    describe 'guest_count is invalid' do
      describe 'when guest_count is an integer > 12' do
        let(:guest_count) { 13 }

        it 'returns "No option"' do
          expect(result[:formatted]).to eq("No option")
          expect(result[:raw]).to be_nil
        end
      end

      describe 'when guest_count is 11.9 a decimal, it will coerce guest_count = 11' do
        let(:guest_count) { 11.9 }
        let(:expected_result) { "Single Double Double Double Family - $265" }

        it_behaves_like 'success find optimal option'
      end

      describe 'when guest_count is a string' do
        context 'case guest_count = "2" is an integer string, it will coerce guest_count = 2' do
          let(:guest_count) { "2" }
          let(:expected_result) { "Double - $50" }

          it_behaves_like 'success find optimal option'
        end

        context 'case guest_count = "some-string" is an invalid string, it will coerce guest_count = 0' do
          let(:guest_count) { 'some-string' }

          it 'returns errors on validate' do
            expect(result[:errors][:guest_count][0]).to eq("must be greater than 0")
          end
        end
      end

      describe 'when guest_count is an integer <= 0' do
        let(:guest_count) { 0 }

        it 'returns errors on validate' do
          expect(result[:errors][:guest_count][0]).to eq("must be greater than 0")
        end
      end
    end
  end
end
