const express = require('express');
const catchAsync = require('../utils/catchAsync');

const { ensureAuthenticated, isOwner } = require('../middleware');

const { newCompany, getCompanies, updateCompany, deleteCompany } = require('../controllers/companies');

const router = express.Router({ mergeParams: true });

router.post('/', newCompany);

router.get('/:id', ensureAuthenticated, isOwner, catchAsync(getCompanies));

router.put('/:id', ensureAuthenticated, isOwner, updateCompany);

router.delete('/:id', ensureAuthenticated, isOwner, deleteCompany);

module.exports = router;
