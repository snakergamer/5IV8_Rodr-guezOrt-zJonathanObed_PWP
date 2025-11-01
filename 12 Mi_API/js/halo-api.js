document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.getAttribute('data-tab')).classList.add('active');
    });
});

document.getElementById('fetch-data').addEventListener('click', function() {
    const gamertag = document.getElementById('gamertag').value;
    
    if (!gamertag) {
        alert('Por favor, ingresa un gamertag');
        return;
    }
    
    document.getElementById('loading').style.display = 'block';
    
    document.querySelectorAll('.tab-content').forEach(content => {
        const resultsContainer = content.querySelector('div:last-child');
        if (resultsContainer) {
            resultsContainer.innerHTML = '';
        }
    });
    
    setTimeout(() => {
        const mockData = generateMockData(gamertag);
        
        displayPlayerStats(mockData.player, mockData.stats);
        displayWeapons(mockData.weapons);
        displayVehicles(mockData.vehicles);
        displayCampaign(mockData.campaign);
        displayMultiplayer(mockData.multiplayer);
        displayAchievements(mockData.achievements);
        
        document.getElementById('loading').style.display = 'none';
    }, 1500);
});

function generateMockData(gamertag) {
    return {
        player: {
            gamertag: gamertag,
            emblemUrl: "https://example.com/emblem.png",
            spartanRank: 45,
            serviceTag: "SPRT",
            timePlayed: "3d 12h 45m"
        },
        stats: {
            totalKills: 1250,
            totalDeaths: 980,
            totalAssists: 450,
            kdRatio: (1250/980).toFixed(2),
            winRate: "62%",
            favoriteWeapon: "Battle Rifle",
            headshots: 320,
            accuracy: "47%"
        },
        weapons: [
            { name: "Battle Rifle", type: "Rifle", kills: 450, icon: "fa-gun" },
            { name: "Assault Rifle", type: "Rifle", kills: 320, icon: "fa-gun" },
            { name: "Sniper Rifle", type: "Sniper", kills: 180, icon: "fa-crosshairs" },
            { name: "Rocket Launcher", type: "Explosivo", kills: 95, icon: "fa-explosion" },
            { name: "Energy Sword", type: "Melé", kills: 75, icon: "fa-sword" },
            { name: "Magnum", type: "Pistola", kills: 130, icon: "fa-gun" }
        ],
        vehicles: [
            { name: "Warthog", type: "Terrestre", destroys: 25, icon: "fa-car" },
            { name: "Ghost", type: "Flotante", destroys: 18, icon: "fa-motorcycle" },
            { name: "Banshee", type: "Aéreo", destroys: 12, icon: "fa-jet-fighter" },
            { name: "Scorpion", type: "Tanque", destroys: 8, icon: "fa-tank" }
        ],
        campaign: {
            progress: 78,
            difficulty: "Heroic",
            missions: [
                { name: "Pilar del Otoño", completed: true, time: "45:32", difficulty: "Normal" },
                { name: "Halos", completed: true, time: "1:12:15", difficulty: "Heroic" },
                { name: "La Verdad y la Reconciliación", completed: true, time: "58:43", difficulty: "Heroic" },
                { name: "El Silenciador", completed: true, time: "1:05:22", difficulty: "Heroic" },
                { name: "Asalto en el Controlador", completed: false, time: "0", difficulty: "Legendario" },
                { name: "343 Guilty Spark", completed: false, time: "0", difficulty: "Legendario" }
            ]
        },
        multiplayer: {
            matchesPlayed: 125,
            wins: 78,
            losses: 47,
            timePlayed: "2d 8h 15m",
            favoriteMode: "Slayer",
            rank: "Diamond II",
            topMedals: [
                { name: "Killing Spree", count: 25 },
                { name: "Sniper Kill", count: 18 },
                { name: "Headshot", count: 42 }
            ]
        },
        achievements: [
            { name: "Inicio Legendario", description: "Completa la primera misión en Legendario", unlocked: true, icon: "fa-trophy" },
            { name: "As del Volante", description: "Destruye 10 vehículos enemigos", unlocked: true, icon: "fa-car" },
            { name: "Francotirador", description: "Consigue 50 bajas con sniper", unlocked: true, icon: "fa-crosshairs" },
            { name: "Maestro de Halo", description: "Completa la campaña en Legendario", unlocked: false, icon: "fa-crown" },
            { name: "Coleccionista", description: "Encuentra todos los skulls", unlocked: false, icon: "fa-skull" },
            { name: "Asesino en Masa", description: "Consigue 1000 bajas", unlocked: true, icon: "fa-skull" }
        ]
    };
}

function displayPlayerStats(player, stats) {
    const container = document.getElementById('player-results');
    
    const playerCard = `
        <div class="card">
            <div class="card-header">Información del Jugador</div>
            <div class="card-body">
                <div class="stat">
                    <span>Gamertag:</span>
                    <span class="stat-value">${player.gamertag}</span>
                </div>
                <div class="stat">
                    <span>Rango Spartan:</span>
                    <span class="stat-value">${player.spartanRank}</span>
                </div>
                <div class="stat">
                    <span>Service Tag:</span>
                    <span class="stat-value">${player.serviceTag}</span>
                </div>
                <div class="stat">
                    <span>Tiempo Jugado:</span>
                    <span class="stat-value">${player.timePlayed}</span>
                </div>
            </div>
        </div>
    `;
    
    const statsCard = `
        <div class="card">
            <div class="card-header">Estadísticas Generales</div>
            <div class="card-body">
                <div class="stat">
                    <span>Total de Eliminaciones:</span>
                    <span class="stat-value">${stats.totalKills}</span>
                </div>
                <div class="stat">
                    <span>Total de Muertes:</span>
                    <span class="stat-value">${stats.totalDeaths}</span>
                </div>
                <div class="stat">
                    <span>Total de Asistencias:</span>
                    <span class="stat-value">${stats.totalAssists}</span>
                </div>
                <div class="stat">
                    <span>Ratio K/D:</span>
                    <span class="stat-value">${stats.kdRatio}</span>
                </div>
                <div class="stat">
                    <span>Porcentaje de Victorias:</span>
                    <span class="stat-value">${stats.winRate}</span>
                </div>
                <div class="stat">
                    <span>Precisión:</span>
                    <span class="stat-value">${stats.accuracy}</span>
                </div>
                <div class="stat">
                    <span>Headshots:</span>
                    <span class="stat-value">${stats.headshots}</span>
                </div>
                <div class="stat">
                    <span>Arma Favorita:</span>
                    <span class="stat-value">${stats.favoriteWeapon}</span>
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = playerCard + statsCard;
}

function displayWeapons(weapons) {
    const container = document.getElementById('weapon-results');
    
    let weaponsHTML = '';
    weapons.forEach(weapon => {
        weaponsHTML += `
            <div class="weapon-card">
                <div class="weapon-icon">
                    <i class="fas ${weapon.icon}"></i>
                </div>
                <h4>${weapon.name}</h4>
                <p>Tipo: ${weapon.type}</p>
                <p>Eliminaciones: ${weapon.kills}</p>
            </div>
        `;
    });
    
    container.innerHTML = weaponsHTML;
}

function displayVehicles(vehicles) {
    const container = document.getElementById('vehicle-results');
    
    let vehiclesHTML = '';
    vehicles.forEach(vehicle => {
        vehiclesHTML += `
            <div class="vehicle-card">
                <div class="vehicle-icon">
                    <i class="fas ${vehicle.icon}"></i>
                </div>
                <h4>${vehicle.name}</h4>
                <p>Tipo: ${vehicle.type}</p>
                <p>Destrucciones: ${vehicle.destroys}</p>
            </div>
        `;
    });
    
    container.innerHTML = vehiclesHTML;
}

function displayCampaign(campaign) {
    const container = document.getElementById('campaign-results');
    
    let campaignHTML = `
        <div class="card">
            <div class="card-header">Progreso General de Campaña</div>
            <div class="card-body">
                <div class="stat">
                    <span>Progreso Total:</span>
                    <span class="stat-value">${campaign.progress}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress" style="width: ${campaign.progress}%"></div>
                </div>
                <div class="stat">
                    <span>Dificultad Actual:</span>
                    <span class="stat-value">${campaign.difficulty}</span>
                </div>
            </div>
        </div>
    `;
    
    campaign.missions.forEach(mission => {
        const status = mission.completed ? "Completada" : "Pendiente";
        
        campaignHTML += `
            <div class="campaign-mission">
                <div class="mission-header">
                    <span class="mission-name">${mission.name}</span>
                    <span class="mission-difficulty">${mission.difficulty}</span>
                </div>
                <div class="mission-stats">
                    <span>Estado: ${status}</span>
                    <span>Tiempo: ${mission.time}</span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = campaignHTML;
}

function displayMultiplayer(multiplayer) {
    const container = document.getElementById('multiplayer-results');
    
    const statsCard = `
        <div class="card">
            <div class="card-header">Estadísticas de Multijugador</div>
            <div class="card-body">
                <div class="stat">
                    <span>Partidas Jugadas:</span>
                    <span class="stat-value">${multiplayer.matchesPlayed}</span>
                </div>
                <div class="stat">
                    <span>Victorias:</span>
                    <span class="stat-value">${multiplayer.wins}</span>
                </div>
                <div class="stat">
                    <span>Derrotas:</span>
                    <span class="stat-value">${multiplayer.losses}</span>
                </div>
                <div class="stat">
                    <span>Tiempo Jugado:</span>
                    <span class="stat-value">${multiplayer.timePlayed}</span>
                </div>
                <div class="stat">
                    <span>Modo Favorito:</span>
                    <span class="stat-value">${multiplayer.favoriteMode}</span>
                </div>
                <div class="stat">
                    <span>Rango:</span>
                    <span class="stat-value">${multiplayer.rank}</span>
                </div>
            </div>
        </div>
    `;
    
    let medalsHTML = '<div class="card"><div class="card-header">Medallas Más Obtenidas</div><div class="card-body">';
    multiplayer.topMedals.forEach(medal => {
        medalsHTML += `
            <div class="stat">
                <span>${medal.name}:</span>
                <span class="stat-value">${medal.count}</span>
            </div>
        `;
    });
    medalsHTML += '</div></div>';
    
    container.innerHTML = statsCard + medalsHTML;
}

function displayAchievements(achievements) {
    const container = document.getElementById('achievement-results');
    
    let achievementsHTML = '';
    achievements.forEach(achievement => {
        const status = achievement.unlocked ? "Desbloqueado" : "Bloqueado";
        
        achievementsHTML += `
            <div class="medal-card">
                <div class="medal-icon">
                    <i class="fas ${achievement.icon}"></i>
                </div>
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                <p><strong>Estado: ${status}</strong></p>
            </div>
        `;
    });
    
    container.innerHTML = achievementsHTML;
}