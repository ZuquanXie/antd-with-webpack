module.exports = (app) => {
    /* GET请求 */
    app.get('/info', (req, res) => {
        res.statusCode = 200;
        res.json({
            projectName: 'antd with webpack',
            keywords: ['webpack', 'react', 'ant-design']
        });
    });
};