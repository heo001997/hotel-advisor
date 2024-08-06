class Accommodation < ApplicationRecord
  enum :room_type, { single: 1, double: 2, family: 3 }
end
