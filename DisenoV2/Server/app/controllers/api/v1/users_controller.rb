module Api
    module V1
        class UsersController < ApplicationController
            def register
                # Create the user object
                @user = User.new(user_params)
                # Verify if the user already exist
                if not (User.find_by_email(params[:email]))
                    @user.password = params[:password]
                    @user.password_confirmation = params[:password_confirmation]
                    # Save the user if no errors
                    if @user.save
                        render json: {status: 'SAVED', data: @user}, status: :ok
                    else 
                        render json: {status: 'ERROR', data: @user.errors}, status: :unprocessable_entity
                    end
                else
                    render json: {status: 'User already exist'}, status: :ok
                end
            end
            def login
                # Find the user by its email and compare the password
                @user = User.find_by_email(params[:email]).try(:authenticate, params[:password])
                # If no error
                if (@user)
                    # Encode the user information the create the JWT
                    @token = JsonWebToken.encode(user: @user.name, email: @user.email, id: @user.id)
                    render json: {status: 'Login Successfull', token: @token }, status: :ok
                else
                    render json: {status: 'Login Error'}, status: :ok
                end 
            end
            def addTruck 
                # Get the token
                @token = request.headers[:Authorization]
                if @token
                    # Decode the token information
                    @tokenDecode = JsonWebToken.decode(@token)
                    # Find the user by its id
                    @user = User.find_by_id(@tokenDecode[:id])
                    # If the user exist
                    if @user
                        # Check if already exist a truck with that name
                        if Truck.find_by_truckname(params[:truckname])
                            render json: {status:"Error", error:"Already exist a truck with that name"}
                        else
                            # Create the truck
                            @user.trucks.create(truckname: params[:truckname])
                            render json: {status:"Success", msg:"Truck added successfully"}, status: :ok
                        end
                    else
                        render json: {status: "Error", error:"User dont exist"}, status: :ok
                    end
                else
                    render json: {status:"Error", error: "Unauthorized"}, status: :ok
                end
            end
            def getTrucks 
                # Get the token
                @token = request.headers[:Authorization]
                if @token
                    # Decode the token information
                    @tokenDecode = JsonWebToken.decode(@token)
                    # Find the user by its id
                    @user = User.find_by_id(@tokenDecode[:id])
                    # If the user exist
                    if @user
                        @trucks = Truck.where(user_id: @tokenDecode[:id])
                        render json: {status: "Success", trucks: @trucks}, status: :ok
                    else
                        render json: {status: "Error", errors: @trucks.errors}, status: :ok
                    end
                else
                    render json: {status:"Error", error: "Unauthorized"}, status: :ok
                end
            end
            def addLocation
                # Find the truck that is sending its info
                @truck = Truck.find_by_truckname(params[:truckname])
                # Save the truck location
                @truck.locations.create(
                    Lat: params[:lat],
                    Lng: params[:lng],
                    Date: params[:date],
                    Time: params[:time],
                    RPM: params[:rpm],
                    Vel: params[:vel]
                )
                render json: {status:"Success", msg:"Location Saved"}, status: :ok
            end
            def getLocations
                # Get the token
                @token = request.headers[:Authorization]
                if @token
                    # Find the user by its id
                    @truck = Truck.find_by_truckname(params[:truckname])
                    # If the truck exist
                    if @truck
                        @locations = Location.where(truck_id: @truck.id, Date: params[:startDate]..params[:endDate], Time: params[:startTime]..params[:endTime])
                        render json: {status: "Success", locations: @locations}, status: :ok
                    else
                        render json: {status: "Error", errors: @locations.errors}, status: :ok
                    end
                else
                    render json: {status:"Error", error: "Unauthorized"}, status: :ok
                end
            end
            def liveLocation
                # Get the token
                @token = request.headers[:Authorization]
                if @token
                    # Find the user by its id
                    @truck = Truck.find_by_truckname(params[:truckname])
                    # If the truck exist
                    if @truck
                        @locations = Location.where(truck_id: @truck.id)
                        @location = @locations.last
                        render json: {status: "Success", location: @location}, status: :ok
                    else
                        render json: {status: "Error", errors: @locations.errors}, status: :ok
                    end
                else
                    render json: {status:"Error", error: "Unauthorized"}, status: :ok
                end
            end
            private
            def user_params
                params.require(:user).permit(:name, :email)
            end
        end
    end
end