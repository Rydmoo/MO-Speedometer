local speed = 0.0
local fuel = 0.0
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0) 
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, false)
        if vehicle ~= 0 and GetPedInVehicleSeat(vehicle, -1) == ped then
            local speed = math.floor(GetEntitySpeed(vehicle) * 3.6) 
            local gear = GetVehicleCurrentGear(vehicle)
            local isReversing = GetVehicleCurrentGear(vehicle) == 0
            local isMoving = speed > 0
            local gearStatus = "N" 
            if isMoving and not isReversing then
                gearStatus = "D" 
            elseif isReversing then
                gearStatus = "R" 
            end
            local fuelLevel = GetVehicleFuelLevel(vehicle) 
            SendNUIMessage({
                action = "updateSpeedometer",
                speed = speed,
                gear = gearStatus,
                fuel = fuelLevel
            })
        else
            SendNUIMessage({
                action = "hideSpeedometer"
            })
        end
    end
end)