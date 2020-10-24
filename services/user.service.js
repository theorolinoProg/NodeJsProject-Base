import Models from '../models/index';

async function getAll() {
    return await Models.Users.find().select('-hash');
}

async function getById(id) {
    return await Models.Users.findById(id).select('-hash');
}


async function update(id, userParam) {
    let user = await Models.Users.findById(id).select('-hash');

    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await Models.Users.findOne({ username: userParam.username })) {
        throw 'Username [' + userParam.username + '] is already taken';
    }

    if (userParam.email) {
        if (user.email !== userParam.email && await Models.Users.findOne({email: userParam.email})) {
            throw 'Email [' + userParam.email  + '] is already taken';
        }
    }
    // copy userParam properties to user
    Object.assign(user, userParam);

    user = await user.save();
    return user;
}

async function _delete(id) {
    await Models.Users.findByIdAndRemove(id);
}


module.exports = {
    getAll,
    getById,
    update,
    delete: _delete
};