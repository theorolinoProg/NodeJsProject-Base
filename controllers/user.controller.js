import userServices from '../services/user.service';

function _getAll(req, res, next) {
    userServices.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function _update(req, res, next) {
    userServices.update(req.params.id, req.body)
        .then((user) => res.json(user))
        .catch(err => 
            next(err)
            );
}


function _getById(req, res, next) {
    userServices.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userServices.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

module.exports = {
    _getAll,
    _getById,
    _update,
    _delete
};