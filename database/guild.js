const { Schema, model } = require('mongoose');

const MilestoneSchema = new Schema({
  count: Number,
  date: Date,
  member: String,
});

const CountSchema = new Schema({
  count: Number,
  date: Date,
});

const MultiplierSchema = new Schema({
  multiplier: Number,
  targets: [String],
  type: String,
});

const MentionedRoleSchema = new Schema({
  _id: String,
  date: Date,
});

const GuildSchema = new Schema({
  _id: { required: true, type: String },
  autoPublishChannels: { of: String, type: Array },
  autoResetLevels: Number,
  autoRole: { of: String, type: Array },
  autoRoleTimeout: Number,
  blacklistedChannels: { of: String, type: Array },
  counts: [CountSchema],
  emojiList: Boolean,
  emojiListChannel: String,
  leftAt: Number,
  levels: Boolean,
  mentionCooldown: Number,
  mentionCooldownRoles: { of: String, type: Array },
  mentionedRoles: { of: MentionedRoleSchema, type: Array },
  milestones: [MilestoneSchema],
  milestonesChannel: String,
  milestonesInterval: Number,
  milestonesMessage: String,
  milestonesRoles: { of: String, type: Array },
  noXpRoles: { of: String, type: Array },
  prefix: String,
  premium: Boolean,
  prioritiseMultiplierRoleHierarchy: Boolean,
  stackXpRoles: Boolean,
  storeCounts: Boolean,
  storeMilestones: Boolean,
  topXp: String,
  topXpRole: String,
  xpBlacklistedChannels: { of: String, type: Array },
  xpMessage: String,
  xpMultipliers: { of: MultiplierSchema, type: Array },
  xpResponseType: String,
  xpRoles: { of: [String], type: Map },
  xpWhitelistedChannels: { of: String, type: Array },
});

module.exports = model('guilds', GuildSchema)
