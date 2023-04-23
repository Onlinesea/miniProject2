// export interface digimonAvatar{
//     name: string
//     image: string 
//     currentProgress: number 
//     growthState: string 
//     evolution: number[]
// }

// export interface user{
//     username: string
//     password:string 
//     // furture enhance will be encryptiong of password 
// }

export interface journal{
    user:string
    message:string 
    author:string
    thoughts:string 
    date:Date
    feelings:string 
}

export interface journalList{
    // user:string
    journalList:journal[] 
}

export interface userIsValid{
    valid:boolean
}
export interface EmailData{
    to:String
    subject:String
    body: String
}