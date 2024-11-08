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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rex = void 0;
var typeorm_1 = require("typeorm");
var Project_1 = require("./Project");
var Rex = /** @class */ (function () {
    function Rex(answer1, answer2, answer3) {
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
    }
    Rex.prototype.getId = function () {
        return this.id;
    };
    Rex.prototype.setAnswer1 = function (answer1) {
        this.answer1 = answer1;
    };
    Rex.prototype.getAnswer1 = function () {
        return this.answer1;
    };
    Rex.prototype.setAnswer2 = function (answer2) {
        this.answer2 = answer2;
    };
    Rex.prototype.getAnswer2 = function () {
        return this.answer2;
    };
    Rex.prototype.setAnswer3 = function (answer3) {
        this.answer3 = answer3;
    };
    Rex.prototype.getAnswer3 = function () {
        return this.answer3;
    };
    Rex.prototype.getProject = function () {
        return this.project;
    };
    Rex.prototype.setProject = function (project) {
        this.project = project;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Rex.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Rex.prototype, "answer1", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Rex.prototype, "answer2", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Rex.prototype, "answer3", void 0);
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return Project_1.Project; }, { persistence: false }) // Init one to one relation with User
        ,
        (0, typeorm_1.JoinColumn)() // Join user table with FavoriteList table
        ,
        __metadata("design:type", Project_1.Project)
    ], Rex.prototype, "project", void 0);
    Rex = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, String])
    ], Rex);
    return Rex;
}());
exports.Rex = Rex;
//# sourceMappingURL=Rex.js.map