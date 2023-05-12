export default class Api {
    constructor (options){
        this._baseUrl = options.baseUrl
        this._headers =options.headers
    }

__checkResponse (res){
    if (res.ok){
      return  res.json() 
    }
    else {
        return Promise.reject(`Ошибка ${res.status}`)
    }

}

    async getInitialCards() {
        const response = await fetch(`${this._baseUrl}/cards`, {
            headers: this._headers

        })

       return this.__checkResponse(response)
    }

async getUserInfo(){
    const response = await fetch(`${this._baseUrl}/users/me `, {
        headers: this._headers

    })
    return this.__checkResponse(response)
}

async editUserInfo (name, about){
    const response = await fetch(`${this._baseUrl}/users/me `,{
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
    return this.__checkResponse(response)
}
async editPhoto (name, link){
    const response = await fetch(`${this._baseUrl}/cards `,{
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    return this.__checkResponse(response)
}

async editUserAva (avatar){
    const response = await fetch(`${this._baseUrl}/users/me/avatar`,{
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            avatar: avatar
    
        })
    })
    return this.__checkResponse(response)

}

async deleteCard (id){
    const response = await fetch(`${this._baseUrl}/cards/${id}`,{
        method: "DELETE",
        headers: this._headers
    })
    return this.__checkResponse(response)

}

async setLike (id){
    const response = await fetch(`${this._baseUrl}/cards/${id}/likes`,{
        method: "PUT",
        headers: this._headers
    })
    return this.__checkResponse(response)

}

async deleteLike (id){
    const response = await fetch(`${this._baseUrl}/cards/${id}/likes`,{
        method: "DELETE",
        headers: this._headers
    })
    return this.__checkResponse(response)

}
async toggleLike(id,liked) {
    if (liked) {
        return await setLike(id)
    } 
    return await deleteLike(id)
}  



}
