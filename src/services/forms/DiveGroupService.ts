import { ICustomUser } from '@/interfaces/CustomUser';
import instance from '../axiosConfig';
import { IDiveGroup } from '@/interfaces/DiveGroup';

export default {
    // Créer un nouveau groupe de plongée
    createDiveGroup(data: IDiveGroup) {
        return instance.post('dive-groups/', data);
    },

    // Récupérer tous les groupes de plongée
    getAllDiveGroups() {
        return instance.get('dive-groups/');
    },

    // Récupérer un groupe de plongée spécifique par ID
    getDiveGroupById(id: number) {
        return instance.get(`dive-groups/${id}/`);
    },

    // Mettre à jour un groupe de plongée spécifique
    updateDiveGroup(id: number, data: IDiveGroup) {
        return instance.put(`dive-groups/${id}/`, data);
    },

    // Supprimer un groupe de plongée
    deleteDiveGroup(id: number) {
        return instance.delete(`dive-groups/${id}/`);
    },

    getAllInstructors() {
        // Remplacez 'instructors' par l'URL appropriée pour récupérer les instructeurs
        return instance.get<ICustomUser[]>('instructors/');
    },

    // Méthode pour récupérer tous les plongeurs
    getAllDivers() {
        // Remplacez 'divers' par l'URL appropriée pour récupérer les plongeurs
        return instance.get<ICustomUser[]>('divers/');
    },
};
