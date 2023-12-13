import User from "../models/UserModel.js";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
    const last_id = parseInt(req.query.lastId) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";

    let result = [];
    if (last_id < 1) {
        // select *from users where name like '%search%' or email like '%search%' or gender like '%search%' limit 10 order by id desc
        const results = await User.findAll({
            where: {
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    email: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    gender: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            limit: limit,
            order: [
                ['id', 'ASC']
            ]
        });
        result = results;
    } else {
        // select *from users where id < last_id and (name like '%search%' or email like '%search%' or gender like '%search%') limit 10 order by id desc
        const results = await User.findAll({
            where: {
                id: {
                    // [Op.lt]: last_id // lt = less then (<),p menggunakan where ini karena desc
                    [Op.gt]: last_id // gt = Greater than (>),p menggunakan where ini karena asc
                },
                [Op.or]: [{
                    name: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    email: {
                        [Op.like]: '%' + search + '%'
                    }
                }, {
                    gender: {
                        [Op.like]: '%' + search + '%'
                    }
                }]
            },
            limit: limit,
            order: [
                ['id', 'ASC']
            ]
        });
        result = results;
    }
    res.json({
        result: result,
        lastId: result.length ? result[result.length - 1].id : 0,
        hasMore: result.length >= limit ? true : false
    });

}