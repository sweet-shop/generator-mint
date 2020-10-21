export default {
    userName: [
        {
            required: true,
            message: '请输入4-16位字母、数字',
            pattern: /^[a-zA-Z0-9]{4,16}$/
        }
    ],
    position: [
        {
            required: true,
            message: '请输入1-50位汉字',
            pattern: /[\u4e00-\u9fa5]{1,50}/
        }
    ],
    // eslint-disable-next-line camelcase
    userName_complex: [
        {
            required: true,
            message: '请输入1-50位小写字母、数字、_@$.',
            pattern: /[a-z0-9@$_.]{1,50}/
        }
    ],
    nickName: [
        {
            required: true,
            message: '请输入1-50位汉字、小写字母、数字_@$|-.()',
            pattern: /[\u4e00-\u9fa5_a-z0-9_@$\|\-\.\(\)]{1,50}/
        }
    ],
    companyName: [
        {
            required: true,
            message: '请输入1-50位汉字、小写字母、数字_@$|-.()',
            pattern: /[\u4e00-\u9fa5_a-z0-9_@$\|\-\.\(\)]{1,50}/
        }
    ],
    // eslint-disable-next-line camelcase
    chinese_2_to_5: [
        // 2-15位汉字，必填
        {
            required: true,
            message: '请输入2-5位汉字',
            pattern: /^[\u4e00-\u9fa5]{2,5}$/
        }
    ],
    phone: [
        {
            //手机
            required: true,
            pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
            message: '请输入正确的手机号'
        }
    ],
    password: [
        {
            // 密码
            required: true,
            pattern: /^(?![0-9]+)(?![a−zA−Z]+)(?![a-zA-Z]+)(?![a−zA−Z]+)[0-9A-Za-z]{8,20}$/,
            message: '请输入6位包含字母数字的密码'
        }
    ],
    dividePriceFifteenSecond: [
        {
            required: true,
            message: '请输入正数且最多2位小数',
            pattern: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
        }
    ]
};
