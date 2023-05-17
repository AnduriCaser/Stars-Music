const model = require("../models");


const { hashPassword, hashCompare } = require("../utils/CustomHash");
const { customErrorResponse } = require("../utils/CustomResponse");

module.exports = {
    async getAllAlbums(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            return res.render('auth/login');
        } else if (req.method === 'POST') {
            if (req.body || req.body !== undefined) {
                const { email, password } = req.body;
                if (((email || email !== undefined) && (typeof email === 'string')) && ((password || password !== undefined) && (typeof password === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { email: email } });
                        if (user && hashCompare(user.password, hashPassword(password))) {
                            req.session.regenerate((err) => {
                                if (err) throw err;
                                req.session.user = user;
                                req.session.save(async (err) => {
                                    if (err) throw err;
                                    await user.getRole()
                                        .then(async (role) => {
                                            req.session.role = role.name;
                                            return res.redirect(`/${role.name}/dashboard`);
                                        });
                                });
                            });
                        } else {
                            throw new Error("User not found");
                        }
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Email or password empty!");
                }
            } else {
                return customErrorResponse(res, 405, "Body is empty");
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },
    async getAlbumById(req, res) {
        const { User, Role } = await model;

        if (req.method === 'GET') {
            return res.render('auth/register');
        } else if (req.method === 'POST') {
            if (req.body || req.body !== undefined) {
                const { email, password } = req.body;
                if (((email || email !== undefined) && (typeof email === 'string')) && ((password || password !== undefined) && (typeof password === 'string'))) {
                    try {
                        const existsUser = await (await User).findOne({ where: { email: email } });
                        if (!existsUser) {
                            const user = await (await User).create({ email: email, password: hashPassword(password) });
                            const role = await (await Role).findOne({ where: { name: 'user' } });
                            user.setRole(role);
                            return res.redirect('/auth/login');
                        }
                        throw new Error("User exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            } else {
                return customErrorResponse(res, 405, "Body is empty");
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },
    async createAlbum(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            return res.render('auth/resetPassword');
        } else if (req.method === 'POST') {
            if (req.body || req.body !== undefined) {
                const { email } = req.body;
                if (((email || email !== undefined) && (typeof email === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { email: email } });
                        if (user) {
                            await user.generateToken(user.email);
                            return res.redirect('/auth/login');
                        }
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            } else {
                return customErrorResponse(res, 405, "Body is empty");
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async updateAlbum(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            return res.render('auth/resetPassword');
        } else if (req.method === 'POST') {
            if (req.body || req.body !== undefined) {
                const { email } = req.body;
                if (((email || email !== undefined) && (typeof email === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { email: email } });
                        if (user) {
                            await user.generateToken(user.email);
                            return res.redirect('/auth/login');
                        }
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            } else {
                return customErrorResponse(res, 405, "Body is empty");
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async deleteAlbum(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },
    async getAlbumSongs(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async addSongToAlbum(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async removeSongFromAlbum(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async getAlbumByArtist(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async getTopAlbums(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async searchAlbums(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async deleteAlbum(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },

    async getAlbumDuration(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    },
    async getAlbumArtists(req, res) {
        const { User } = await model;

        if (req.method === 'GET') {
            if (req.params || req.params !== undefined) {
                const { uuid } = req.params;
                if (((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            return res.render('auth/changePassword', {
                                uuid
                            });
                        };
                        throw new Error("User not found !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "Something went wrong !");
                }
            }
        } else if (req.method === 'POST') {
            if ((req.params || req.params !== undefined) && (req.body || req.body !== undefined)) {
                const { uuid } = req.params;
                const { password } = req.body;
                if (((password || password !== undefined) && (typeof password === 'string')) && ((uuid || uuid !== undefined) && (typeof uuid === 'string'))) {
                    try {
                        const user = await (await User).findOne({ where: { resetToken: uuid } });
                        if (user) {
                            user.password = hashPassword(password);
                            user.save();
                            return res.redirect('/auth/login');
                        };
                        throw new Error("User doesn't exists !");
                    } catch (err) {
                        return customErrorResponse(res, 404, err.message);
                    }
                } else {
                    return customErrorResponse(res, 404, "UUID or password empty !");
                }
            }
        } else {
            return customErrorResponse(res, 405, "Method not allowed");
        }
    }
}
