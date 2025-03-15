export interface Firework {
    id: number;
    name: string;
    length: number;
    description: string;
    nodePin: string;
}


export class FireworkCountdown {
    id: number = 0;
    fireworkName: string = '';
    fireTime: number = 0;
    triggerWire: string = '';
}


export class UploadResponse {
    fireworkCount: number = 0;
    maxfireTime: number = 0;
    message: string = '';
    success: boolean = false;
}

export interface ShowState {
    state: string;
    showStarted: boolean;
    showPaused: boolean;
    elapsedTime: number;       // in seconds
    fireworkCount: number;
    maxfireTime: number;
    fireworksFired: number;
}

/* 
{
    "Letter": "A";
    "RSSI": 100,
    "Battery": 3.819999933,s
    "MAC": "A0:DD:6C:0F:A9:E8"
}
*/
export class LauncherNode {
    Letter: string = '';
    RSSI: number = 0;
    BatteryPercent: number = 0;
    MAC: string = '';
}

