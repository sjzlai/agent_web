var env = process.env;
var settings = {
    //全局设置
    gbs: {
        https: env.NODE_ENV === 'dev' ? 'localhost:8000/proxy/c.lunghealthbiotech.com' : '',
        host: '80', //接口根地址。本地代理到slsadmin.api.sls.com,线上使用的是Nginx代理
        db_prefix: '', //本地存储的key
    },
    //回调函数
    cbs: {
        /* 
         * ajax 回调，返回的状态吗不是200 的时候访问
         * @param object err 返回对象，
         */
        statusError(err) {
            if (err.status !== 404) {
                this.$message({
                    showClose: true,
                    message: '返回错误' + err,
                    type: 'error'
                })
            } else {
                settings.cbs.illegal.call(this);
            } /*else end*/
        },
        illegal(err) {
            this.$store.dispatch('remove_userinfor').then(() => {
                this.$alert('非法操作', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.$router.push('/login');
                    }
                });
            })
            return
        }
    }
};
module.exports = settings;