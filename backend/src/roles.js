import AccessControl from "accesscontrol";
const ac = new AccessControl();

exports.roles = (function () {
  ac.grant("user").readAny("blog");
  ac.grant("admin").extend("user").createAny("blog");

  return ac;
})();
