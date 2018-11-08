import XHttp from 'x-http-lib'
import axios from 'axios';

const MyPlugin = {
    install(instance, options) {
        instance.setRequest((requestArgs) => {
            return axios({
				url: requestArgs.url,
				method: requestArgs.method,
				headers: requestArgs.header,
			});
        })
    }
}

XHttp.use(MyPlugin).bindDirective("b", value => {
	return value;
	// return Base64.encode(value);
});

const xHttp = new XHttp();
xHttp.setDomin("http://miniptapi.innourl.com");
xHttp.addRequests({
	getUserPlayInfo: "/Redpacket/User/GetUserPlayInfo/{userId:b}&{brandId}"
}).bindPreHandles((request) => {
	console.log(request);
});

xHttp.getUserPlayInfo({
	query: {
		userId: 'Mg==',
		brandId: "1003"
	}
}).then(res => {
	console.log(res);
});