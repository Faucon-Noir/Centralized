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
exports.TeamUser = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Team_1 = require("./Team");
var TeamUser = /** @class */ (function () {
    function TeamUser() {
    }
    TeamUser.prototype.getId = function () {
        return this.id;
    };
    TeamUser.prototype.getCreatedAt = function () {
        return this.created_at;
    };
    TeamUser.prototype.setCreatedAt = function (created_at) {
        return (this.created_at = created_at);
    };
    TeamUser.prototype.getTeam = function () {
        return this.team;
    };
    TeamUser.prototype.setTeam = function (team) {
        this.team = team;
    };
    TeamUser.prototype.getUser = function () {
        return this.user;
    };
    TeamUser.prototype.setUser = function (User) {
        this.user = User;
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", String)
    ], TeamUser.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (user) { return user.teamUser; }),
        __metadata("design:type", User_1.User)
    ], TeamUser.prototype, "user", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Team_1.Team; }, function (team) { return team.teamUser; }),
        __metadata("design:type", Team_1.Team)
    ], TeamUser.prototype, "team", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)({
            type: "timestamp",
            default: function () { return "CURRENT_TIMESTAMP(6)"; },
        }),
        __metadata("design:type", Date)
    ], TeamUser.prototype, "created_at", void 0);
    TeamUser = __decorate([
        (0, typeorm_1.Entity)()
    ], TeamUser);
    return TeamUser;
}());
exports.TeamUser = TeamUser;
//# sourceMappingURL=TeamUser.js.map