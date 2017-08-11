import acl = require("acl");
import { Db } from "mongodb";

let ACL;

export function initialize(db: Db) {
  ACL = new acl(new acl.mongodbBackend(db));
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
}

export default ACL;
