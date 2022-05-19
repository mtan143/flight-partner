import axiosClient from "./axiosClient"

const flightApi = {
    getAll(id) {
        const url = `/customers/flights/airline/${id}`
        return axiosClient.get(url);
    },
<<<<<<< Updated upstream
    add(data){
        const url ='/customers/flights/create'
        return axiosClient.post(url, data);
    },
    updateStatus(data){
        const url ='/customers/flights/status'
        return axiosClient.post(url,data);
=======
    add(data) {
        const url = 'customers/flights/create'
        return axiosClient.post(url, data);
    },
    getAllStatisticYear(id) {
        const url = `/customers/flights/airline/statistic/${id}`
        return axiosClient.get(url);
>>>>>>> Stashed changes
    }
}
export default flightApi;