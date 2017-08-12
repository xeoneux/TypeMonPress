import acl = require("acl");
import mongoose = require("mongoose");

const ACL = new acl(new acl.mongodbBackend(mongoose.connection.db));

ACL.addRoleParents("root", "admin");
ACL.addRoleParents("admin", "user");
ACL.allow([
  {
    roles: ["admin"],
    allows: [{ resources: "/users/index", permissions: "get" }]
  },
  {
    roles: ["root"],
    allows: [{ resources: "/admins/index", permissions: "get" }]
  }
]);

export default ACL;
