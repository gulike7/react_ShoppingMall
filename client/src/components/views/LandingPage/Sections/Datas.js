const kinds = [
    {
        "_id" :1,
        "name":"고데기"
    },
    {
        "_id" :2,
        "name":"롤빗"
    },
    {
        "_id" :3,
        "name":"샴푸"
    },
    {
        "_id" :4,
        "name":"염색제"
    },
    {
        "_id" :5,
        "name":"크림"
    },
    {
        "_id" :6,
        "name":"트리트먼트"
    },
    {
        "_id" :7,
        "name":"화장품"
    },
    {
        "_id" :8,
        "name":"픽서"
    }

]

const price = [
    {
        "_id" : 1,
        "name": "Any",
        "arry": []

    },
    {
        "_id" : 2,
        "name": "1만원 이하",
        "arry": [0,10000]

    },
    {
        "_id" : 3,
        "name": "2만원 이하",
        "arry": [0, 20000]

    },
    {
        "_id" : 4,
        "name": "3만원 이하",
        "arry": [0, 30000]

    },
    {
        "_id" : 5,
        "name": "4만원 이하",
        "arry": [0, 40000]

    },
    {
        "_id" : 6,
        "name": "10만원 이하",
        "arry": [0, 100000]

    }
]

export {
    kinds,
    price
}