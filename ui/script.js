(function () {
    const speedometer = document.createElement('div');
    speedometer.id = 'speedometer';
    speedometer.className = 'hidden';
    speedometer.style.position = 'absolute';
    speedometer.style.bottom = '30px';
    speedometer.style.left = '400px';
    speedometer.style.width = '280px';
    speedometer.style.color = 'white';
    speedometer.style.padding = '10px';
    speedometer.style.borderRadius = '8px';
    speedometer.style.zIndex = '1000';
    speedometer.innerHTML = `
        <div class="flex items-center relative z-20">
            <!-- Gear Box Section -->
            <div class="flex items-center justify-center bg-gray-800 bg-opacity-75 p-2 rounded-md mr-2 text-center" style="background-color: rgb(51, 51, 51); width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 3px;">
                <div class="text-lg font-bold direction text-white" style="line-height: 1;">N</div>
            </div>

            <!-- Speedometer Section -->
            <div class="flex flex-col items-center mr-auto relative">
                <div class="flex items-baseline font-bold text-3xl speed" >
                    <span class="text-5xl speed-value" style="font-weight: 300; margin-left: 15px;">000</span>
                    <span class="text-3xl speed-unit ml-1 mt-1" style="font-weight: 300;">KM/H</span> <!-- Ändrat till font-weight: 300 för tunnare text -->
                </div>
            </div>

            <!-- Fuel Gauge Section -->
            <div class="flex flex-col items-center mr-auto" style="transform: translateY(-20px);"> 
                <i class="mdi mdi-fuel text-xl text-white"></i>
                <div class="w-2 h-12 bg-gray-700 mt-2 rounded-lg overflow-hidden relative" style="background-color: rgb(51, 51, 51);">
                    <div class="fuel-fill bg-white transition-height duration-100 absolute bottom-0 w-full" style="height: 100%; border-radius: 2px;"></div>
                </div>
            </div>
        </div>

        <!-- The actual speed line that goes under all elements -->
        <div class="absolute bottom-0 w-5/6 h-2 z-0" style="background-color:rgb(51, 51, 51); margin-top: -5px;"> <!-- Justerat för att gå under alla element -->
            <div class="speed-fill h-full bg-white transition-width duration-100" style="width: 0%; border-radius: 2px;"></div>
        </div>
    `;
    document.body.appendChild(speedometer);

    const updateSpeedometer = (function () {
        return function (speed, gear, fuel) {
            speedometer.style.display = 'block';
            speedValue.textContent = String(speed).padStart(3, '0');
            direction.textContent = gear;

            const speedPercentage = Math.min((speed / 300) * 100, 100);
            // Uppdaterar det faktiska speed-fill elementet
            speedFill.style.width = `${speedPercentage}%`;

            const fuelPercentage = Math.min(Math.max(fuel, 0), 100);
            fuelFill.style.height = `${fuelPercentage}%`;
        };
    })();

    const hideSpeedometer = (function () {
        return function () {
            speedometer.style.display = 'none';
        };
    })();

    const speedValue = speedometer.querySelector('.speed-value');
    const direction = speedometer.querySelector('.direction');
    const fuelFill = speedometer.querySelector('.fuel-fill');
    const speedFill = speedometer.querySelector('.speed-fill');

    window.addEventListener('message', (function () {
        return function (event) {
            const { action, speed, gear, fuel } = event.data;

            if (action === "updateSpeedometer") {
                updateSpeedometer(speed, gear, fuel);
            } else if (action === "hideSpeedometer") {
                hideSpeedometer();
            }
        };
    })());
})();
