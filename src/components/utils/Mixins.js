import Axios from 'axios'

const URL = 'http://globalbombas.com.br/prosel_carefy/Mobile/'
const config = { headers: { 'Content-Type': 'multipart/form-data' } };

const Login = (nome, senha) => {

    const form = new FormData()
    form.append('username', nome)
    form.append('password', senha)
    return new Promise((resolve, reject) => {
        Axios.post(`${URL}login`, form, config)
            .then(data => {
                resolve(data.data)
            },
                data => reject(data)
            )
    })
}

const getPatients = ( id) => {
    const form = new FormData()
    //form.append('username', nome)
    //form.append('password', senha)
    form.append('user_id', id)
    return new Promise((resolve, reject) => {
        Axios.post(`${URL}get_patients`, form, config)
            .then(data => {
                resolve(data.data)
            },
                data => reject(data)
            )
    })
}

const addPatient = (nome, hos, id) => {
    const form = new FormData()
    form.append('name', nome)
    form.append(' hospital', hos)
    form.append('user_id', id)
    return new Promise((resolve, reject) => {
        Axios.post(`${URL}mobile_add_patient`, form, config)
            .then(data => {
                resolve(data.data)
            },
                data => reject(data)
            )
    })

}
const removePatient = (id, id_patient) => {
    const form = new FormData()
    form.append('user_id', id)
    form.append(' patient_id', id_patient)
    return new Promise((resolve, reject) => {
        Axios.post(`${URL}mobile_remove_patient`, form, config)
            .then(data => {
                resolve(data.data)
            },
                data => reject(data)
            )
    })

}





export default { Login, getPatients,addPatient, removePatient  }