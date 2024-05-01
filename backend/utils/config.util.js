const _config={
    port:process.env.PORT,
    db:process.env.MONGO_URI
}

export const config= Object.freeze(_config);