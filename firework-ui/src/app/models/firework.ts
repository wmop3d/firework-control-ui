export interface Firework {
    id: number;
    name: string;
    length: number;
    description: string;
    nodePin: string;
}


export class FireworkCountdown {
    id: number = 0;
    name: string = '';
    firetime: number = 0;
}

/* 
{
    "Letter": "A",
    "RSSI": 100,
    "Battery": 3.819999933,
    "MAC": "A0:DD:6C:0F:A9:E8"
}
*/
export class LauncherNode {
    Letter: string = '';
    RSSI: number = 0;
    Battery: number = 0;
    MAC: string = '';
}

