import http from '../http-common';
class EquipmentDataService   {
    getAllEquipment() {
        return http.get('/Equipment')
    }
    getEquipmentById(id) {
        return http.get(`/Equipment/${id}`)
    }
    searchEquipment(data) {
        console.log('from service', data)
        return http.get(`/Equipment/search?name=${data}`)
    }
    createEquipment(data) {
        return http.post('/Equipment', data)
    }
    updateEquipment(id, data) {
        return http.put(`/Equipment/${id}`, data)
    }
    
    deleteEquipment(id) {
        return http.delete(`/Equipment/${id}`)
    }
}
export default new EquipmentDataService();