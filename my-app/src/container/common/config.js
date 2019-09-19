messageResource.init({
  // path to directory containing message resource files(.properties files),
  // give empty string or discard this configuration if files are in the
  // same directory as that of html file.
  filePath: "./properties"
});

messageResource.load("configuration", () => {
  // load each key , value from property file and return single JSON
  sessionStorage.setItem(
    "serverIP",
    messageResource.get("serverIP", "configuration")
  );
  sessionStorage.setItem(
    "protocol",
    messageResource.get("protocol", "configuration")
  );
  sessionStorage.setItem(
    "portNo",
    messageResource.get("portNo", "configuration")
  );
  sessionStorage.setItem(
    "alias",
    messageResource.get("alias", "configuration")
  );
});

const serverIP = sessionStorage.getItem("serverIP");
const protocol = sessionStorage.getItem("protocol");
const portNo = sessionStorage.getItem("portNo");

export function getServerUrl() {
  return protocol + "://" + serverIP + ":" + portNo + "/v60/admin";
}

/* API Urls*/
export function getUrl(APIName) {
  var APIUrls = {
    getToken: "/session",
    getSearchResult: "/search/user"
  };
  return getServerUrl() + APIUrls[APIName];
}
