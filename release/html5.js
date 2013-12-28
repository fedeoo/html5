(function (window) {

    var CONTAINER_WIDTH = 960,
        BOX_WIDTH = 240,
        BOX_HEIGHT = 320,
        IMG_PATH = 'image/';

    var frameBoxs = [];
    function createBox (config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || 0;
        this.height = config.height || 0;
        var dom = document.createElement('div');
        dom.style.cssText = "left:" + this.x + 'px;top:' + this.y + 'px;width:' + this.width + 'px;height:' + this.height + 'px;';
        dom.classList.add('frame-box');
        dom.id = 'box_' + config.origin.id;
        var content = document.createElement('div');
        content.classList.add('photo-content');
        content.innerHTML = '<img class="photo-img" src="' + IMG_PATH + config.origin.src + '"></img>' +
                            '<div class="photo-desc-div"><span class="photo-desc">' + config.origin.desc + '</span></div>';
        dom.appendChild(content);
        frameBoxs[config.origin.id] = dom;
        return dom;
    }
    var container = document.getElementById('photoContainer');
    var floatBox;

    function init () {
        var modelData,
            simData;
        simData = getSimdata();
        modelData = transfer(simData, {
            bear: true,
            white: true,
            red: true,
            flower: true
        });
        for (var i = modelData.length - 1; i >= 0; i--) {
            container.appendChild(createBox(modelData[i]));
        }

        $('#typeBlock input[type=checkbox]').click(checkClickHandler);
    }

    function transfer(data, options) {
        var i = 0,
            models = [],
            card,
            gx = 0,
            gy = 0;

        for (i = data.length - 1; i >= 0; i--) {
            if (data[i] && options[data[i].type]) {
                card = {};
                card.width = BOX_WIDTH;
                card.height = BOX_HEIGHT;
                card.x = gx;
                card.y = gy;
                gx += BOX_WIDTH;
                if (gx >= CONTAINER_WIDTH) {
                    gx = 0;
                    gy += BOX_HEIGHT;
                }
                card.origin = data[i];
                models.push(card);
            }
        }
        return models;
    }

    function checkClickHandler() {
        var types = {},
            modelData,
            i,
            changes= {};
        $('input[checked]').each(function () {
            if (this.checked) {
                types[this.id.substring(4).toLowerCase()] = true;
            }
        });
        modelData = transfer(getSimdata(), types);
        for (i = modelData.length - 1; i >= 0; i--) {
            if (modelData[i].origin) {
                changes['box_' + modelData[i].origin.id] = true;
            }
        }
        $('.frame-box').each(function () {
            if(!changes[this.id]) {
                this.style.opacity = 0;
            }
        });

        //众神归位 设置各个box元素调整后位置
        for (i = modelData.length - 1; i >= 0; i--) {
            frameBoxs[modelData[i].origin.id].style.left = modelData[i].x + 'px';
            frameBoxs[modelData[i].origin.id].style.top = modelData[i].y + 'px';
        }
        setTimeout(function () {
            // 位置回正后，再显示之前隐藏的元素
            for (i = modelData.length - 1; i >= 0; i--) {
                frameBoxs[modelData[i].origin.id].style.opacity = 1;
            }
        }, 500);
        
    }

    function verify() {

    }

    init();

})(window);
(function (window) {

    var simData = [
        {
            id : 0,
            src : 'qin-bear-1.jpeg',
            type : 'bear',
            desc : ''
        },
        {
            id : 1,
            src : 'qin-bear-2.jpeg',
            type : 'bear',
            desc : ''
        },
        {
            id : 2,
            src : 'qin-flower-1.jpeg',
            type : 'flower',
            desc : ''
        },
        {
            id : 3,
            src : 'qin-flower-2.jpeg',
            type : 'flower',
            desc : 'the most'
        },
        {
            id : 4,
            src : 'qin-flower-3.jpeg',
            type : 'flower',
            desc : ''
        },
        {
            id : 5,
            src : 'qin-flower-4.jpeg',
            type : 'flower',
            desc : ''
        },
        {
            id : 6,
            src : 'qin-flower-5.jpeg',
            type : 'flower',
            desc : ''
        },
        {
            id : 7,
            src : 'qin-flower-6.jpeg',
            type : 'flower',
            desc : ''
        },
        {
            id : 8,
            src : 'qin-flower-7.jpeg',
            type : 'flower',
            desc : ''
        },
        {
            id : 9,
            src : 'qin-red-1.jpeg',
            type : 'red',
            desc : ''
        },
        {
            id : 10,
            src : 'qin-red-2.jpeg',
            type : 'red',
            desc : ''
        },
        {
            id : 11,
            src : 'qin-red-3.jpeg',
            type : 'red',
            desc : ''
        },
        {
            id : 12,
            src : 'qin-red-4.jpeg',
            type : 'red',
            desc : ''
        },
        {
            id : 13,
            src : 'qin-white-1.jpeg',
            type : 'white',
            desc : ''
        },
        {
            id : 14,
            src : 'qin-white-2.jpeg',
            type : 'white',
            desc : ''
        },
        {
            id : 15,
            src : 'qin-white-3.jpeg',
            type : 'white',
            desc : ''
        },
        {
            id : 16,
            src : 'qin-white-4.jpeg',
            type : 'white',
            desc : ''
        },
        {
            id : 17,
            src : 'qin-white-5.jpeg',
            type : 'white',
            desc : ''
        }
    ];

    window.getSimdata = function () {
        return simData;
    };

})(window);
