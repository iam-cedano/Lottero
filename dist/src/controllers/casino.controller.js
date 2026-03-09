"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const casino_service_1 = __importDefault(require("../services/casino.service"));
const url_parser_util_1 = __importDefault(require("../utils/url-parser.util"));
const validation_exception_1 = __importDefault(require("../exceptions/validation.exception"));
let CasinoController = class CasinoController {
    casinoService;
    constructor(casinoService) {
        this.casinoService = casinoService;
    }
    createCasino = async (req, res) => {
        try {
            const { name, alias, url } = req.body;
            if (!name || !url) {
                res.status(400).json({ message: "Missing name or url" });
                return;
            }
            if (!/^[\p{L}\s]+$/u.test(name)) {
                throw new validation_exception_1.default("Name cannot contain numbers or special characters");
            }
            if (/\p{Lu}/u.test(name)) {
                throw new validation_exception_1.default("Name cannot contain capitalized characters");
            }
            const domainUrl = url_parser_util_1.default.extractDomain(url);
            const casino = await this.casinoService.createCasino({
                name,
                alias,
                url: domainUrl,
            });
            res.status(201).json(casino);
        }
        catch (error) {
            if (error instanceof validation_exception_1.default) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: "Failed to create casino", error });
        }
    };
    getCasinos = async (_req, res) => {
        try {
            const casinos = await this.casinoService.getCasinos();
            res.status(200).json(casinos);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch casinos", error });
        }
    };
    getCasinoById = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid casino ID" });
                return;
            }
            const casino = await this.casinoService.getCasinoById(id);
            if (!casino) {
                res.status(404).json({ message: "Casino not found" });
                return;
            }
            res.status(200).json(casino);
        }
        catch (error) {
            res.status(500).json({ message: "Failed to fetch casino", error });
        }
    };
    updateCasino = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid casino ID" });
                return;
            }
            const { name, alias, url } = req.body;
            if (!name || !url) {
                res.status(400).json({ message: "Missing name or url" });
                return;
            }
            if (!/^[\p{L}\s]+$/u.test(name)) {
                throw new validation_exception_1.default("Name cannot contain numbers or special characters");
            }
            if (/\p{Lu}/u.test(name)) {
                throw new validation_exception_1.default("Name cannot contain capitalized characters");
            }
            const domainUrl = url ? url_parser_util_1.default.extractDomain(url) : url;
            const updatedCasino = await this.casinoService.updateCasino(id, {
                name,
                alias,
                url: domainUrl,
            });
            if (!updatedCasino) {
                res.status(404).json({ message: "Casino not found" });
                return;
            }
            res.status(200).json(updatedCasino);
        }
        catch (error) {
            if (error instanceof validation_exception_1.default) {
                res.status(400).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: "Failed to update casino", error });
        }
    };
    deleteCasino = async (req, res) => {
        try {
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                res.status(400).json({ message: "Invalid casino ID" });
                return;
            }
            const success = await this.casinoService.deleteCasino(id);
            if (!success) {
                res.status(404).json({ message: "Casino not found" });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: "Failed to delete casino", error });
        }
    };
};
CasinoController = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [casino_service_1.default])
], CasinoController);
exports.default = CasinoController;
