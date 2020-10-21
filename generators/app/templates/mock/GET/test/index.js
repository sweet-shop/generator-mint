/**
 * @file:      公司列表 接口数据
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2020-10-21 20:48:33
 */
const Mock = require('mockjs');
const path = require('path');
const mock = require(path.join(process.cwd(), '/mock'));
module.exports = function() {
    let DATA = [];
    mock.doCustomTimes(18, () => {
        DATA.push(
            Mock.mock({
                companyName: '@province()' + '@cword(2)' + '吹牛' + '有限公司',
                propertyTypeCode: '110610000@natural(1, 4)',
                buildingName: '@province()' + '@cword(2)' + '吹牛项目',
                mergerName: '@county(true)',
                profitDate: '1583078399',
                advertisingNumber: '@time("mm:ss")',
                advertisingLength: '@time("ss")',
                deviceNumber: '@integer(10, 100)',
                deviceTotalNumber: '@integer(100, 1000)',
                advertisingPrice: '@float(60, 100, 2, 2)',
                playRate: '@float(60, 100, 2, 2)%',
                advertisingProfit: '@integer(100000, 10000000)'
            })
        );
    });
    return {
        code: 0,
        data: {
            total: 18,
            list: DATA
        },
        msg: '成功'
    };
};
