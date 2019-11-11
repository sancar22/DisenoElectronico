require 'socket.so'
class UdpJob < ApplicationJob
  queue_as :default
  
  def perform(*args)
    ul = UDPSocket.new
    ul.bind("localhost", 4001)
    
    while true
      data = ul.recvfrom(100) 
      p data[0]
      sleep 1
    end
  end
end
