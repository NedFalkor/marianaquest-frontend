export interface IDiveSettings {
    dive_number: number | null;
    dive_date: string | null;
    dive_site: string;
    environment: 'sea' | 'ocean' | 'lake' | '';
    depth: number | null;
    duration_dive: number | null;
    surface_return: string;
    decompression_stop: string;
}

export interface IDiveEquipment {
    bottle_type: number | null;
    wet_suit: string;
    ballast: string;
    dive_type: 'training' | 'exploration' | 'night' | 'drift' | 'wreck' | 'other' | '';
    gas_type: 'nitrox' | 'trimix' | 'rebreather' | '';
    group: string;
    consumption_start: number | null;
    consumption_end: number | null;
}

export interface IDiveConditions {
    air_temperature: number | null;
    water_temperature: number | null;
    weather: 'sun' | 'cloud' | 'rain' | 'downpour' | '';
    visibility: string;
    current: string;
    observations: string;
}

export interface ISignatureData {
    signature: string;
    stamp: string;
}

export interface IDivingLog {
    id: number;
    user: number;
    settings: IDiveSettings;
    equipment: IDiveEquipment;
    conditions: IDiveConditions;
    signatureData: ISignatureData;
}
