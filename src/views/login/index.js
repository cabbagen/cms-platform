import { Input, Button, message } from 'ant-design-vue';
import Network from '../../utils/network';
import prefix from '../../mixins/prefix.mixin';

export default {
    mixins: [prefix],
    name: 'view-login',
    components: {
        'a-input': Input, 'a-button': Button,
    },
    data: function() {
        return {
            answer: '',
            password: '',
            username: '',
            captcha: {
                captchaId: '', b64s: '',
            },
        };
    },
    mounted: function() {
        this.getCaptchaInfo();
    },
    methods: {
        async getCaptchaInfo() {
            const result = await Network.get('/auth/captcha');

            if (result.status !== 200) {
                return;
            }
            this.captcha = result.data;
        },
        async handleLogin() {
            const { username, password, answer, captcha } = this;

            if (username === '' || password === '' || answer === '') {
                message.warning("请将信息填写完整");
                return;
            }

            const tokenInfo = await Network.post('/auth/login', { username, password, answer, captchaId: captcha.captchaId });
            
            if (!tokenInfo) {
                this.getCaptchaInfo();
                return;
            }
            sessionStorage.setItem('token', tokenInfo.token);
            this.$router.go(-1);
        }
    },
}
