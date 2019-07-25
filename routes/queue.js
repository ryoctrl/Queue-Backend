const express = require('express');
const router = express.Router();
const {
    findAll,
    findAllByUncompleted,
    createNewQueue,
    updateOrderedAt,
    updatePaymentedAt,
    updateServicedAt,
    updateHandedAt,
} = require('../controllers/QueueController');


// 未完了のQueueを取得
router.get('/', async (req, res) => {
    const option = req.query.option;
    const result = option === 'uncompleted' ? await findAllByUncompleted() : await findAll();
    res.json(result);
});

// 新規Queueを作成(行列参加時)
router.post('/new', async (req, res) => {
    const isMan = req.body.isMan;
    const queue = await createNewQueue(isMan);
    res.json({
        queue
    });
});

// QueueにOrderedAtを登録(行列で自分の番が来た時)
router.post('/order', async (req, res) => {
    const queueId = req.body.id;
    const queue = await updateOrderedAt(queueId);
    res.json({ queue });
});

// QueueにPaymentedAtを登録(注文が終わり決済が始まった時
router.post('/payment', async (req, res) => {
    const queueId = req.body.id;
    const queue = await updatePaymentedAt(queueId);
    res.json({ queue });
});

// QueueにServicedAtを登録(注文決済が終わった時)
router.post('/service', async (req, res) => {
    const queueId = req.body.id;
    const isCacheLess = req.body.isCacheLess;
    console.log(isCacheLess);
    const queue = await updateServicedAt(queueId, isCacheLess);
    res.json({ queue });
});

router.post('/hand', async (req, res) => {
    const queueId = req.body.id;
    const queue = await updateHandedAt(queueId);
    res.json({queue});
});

module.exports = router;
