const applyPolicy = (roles) => {
    return (req, res, next) => {
        if (roles[0].toUpperCase() === 'PUBLIC') return next();
        if (!req.user) return res.status(401).send({ error: "Usuario no autenticado" });
        if (!roles.includes(req.user.role.toUpperCase())) return res.status(403).send({ error: "No tiene permisos suficientes" });
        next();
    };
};