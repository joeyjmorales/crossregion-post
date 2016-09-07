var url = require("url"),
    _ = require("lodash"),
    swg = require("swagger-node-express"),
    object = require("./object");

/**
 * @param envConfig {Object} [required] environment configuration object
 */
module.exports = function(envConfig){

    return {

        /**
         * HTTP GET
         */
        get: {
            spec: {
                description:      "Search customer onboarding data by keyword",
                path:             "/api/v1/tests/{searchString}",
                method:           "GET",
                summary:          "Search for customer onboarding info by customer or org name",
                notes:            "",
                type:             "object",
                nickname:         "searchCustomerInfo",
                produces:         ["object"],
                parameters:       [
                    swg.paramTypes.path("searchString", "Customer org name or keyword", "string")
                ],
                responseMessages: [
                    {
                        "code":          200,
                        "message":       "Info Found"
                    },
                    {
                        "code":    400,
                        "message": "Error in onboarding query"
                    }
                ]
            },

            action: function(req, res){
                new object({env: envConfig}).get(req.params, function(err, response){
                    if(err) res.status(400).send({"err": err});
                    res.send(JSON.stringify(response));
                });
            }
        },

        post: {
            spec: {
                description:      "Search customer onboarding data by keyword",
                path:             "/api/v1/newTests/{searchString}",
                method:           "POST",
                summary:          "Search for customer onboarding info by customer or org name",
                notes:            "",
                type:             "object",
                nickname:         "searchCustomerInfo",
                produces:         ["object"],
                parameters:       [
                    swg.paramTypes.path("searchString", "Customer org name or keyword", "string")
                ],
                responseMessages: [
                    {
                        "code":          200,
                        "message":       "Info Found"
                    },
                    {
                        "code":    400,
                        "message": "Error in onboarding query"
                    }
                ]
            },

            action: function(req, res){
                new object({env: envConfig}).post(req.params, function(err, response){
                    if(err) res.status(400).send({"err": err});
                    res.send(JSON.stringify(response));
                });
            }
        }

    };
};
