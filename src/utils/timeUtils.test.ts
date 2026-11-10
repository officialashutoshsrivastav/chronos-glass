import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatTimeParts,
  formatDateParts,
  getDynamicGreeting,
  getTimeZoneDetails,
  getSevenSegmentBars,
} from './timeUtils';

test('formatTimeParts formats 12-hour and 24-hour times accurately in UTC', () => {
  // 2026-11-10T14:05:09Z -> 14:05:09 UTC (02:05:09 PM)
  const sampleDate = new Date('2026-11-10T14:05:09.000Z');

  const parts12 = formatTimeParts(sampleDate, false, 'UTC');
  assert.equal(parts12.hours, '02');
  assert.equal(parts12.minutes, '05');
  assert.equal(parts12.seconds, '09');
  assert.equal(parts12.period, 'PM');
  assert.equal(parts12.hour24, 14);

  const parts24 = formatTimeParts(sampleDate, true, 'UTC');
  assert.equal(parts24.hours, '14');
  assert.equal(parts24.minutes, '05');
  assert.equal(parts24.seconds, '09');
  assert.equal(parts24.period, 'PM');
});

test('formatTimeParts handles midnight (00:00) in 12H and 24H modes', () => {
  const midnight = new Date('2026-11-10T00:30:00.000Z');
  const p12 = formatTimeParts(midnight, false, 'UTC');
  assert.equal(p12.hours, '12');
  assert.equal(p12.period, 'AM');
  assert.equal(p12.hour24, 0);

  const p24 = formatTimeParts(midnight, true, 'UTC');
  assert.equal(p24.hours, '00');
  assert.equal(p24.period, 'AM');
});

test('formatDateParts returns Tuesday, November 10, 2026', () => {
  const date = new Date('2026-11-10T12:00:00.000Z');
  const formatted = formatDateParts(date, 'UTC');
  assert.equal(formatted.weekday, 'Tuesday');
  assert.equal(formatted.month, 'November');
  assert.equal(formatted.day, '10');
  assert.equal(formatted.year, '2026');
  assert.equal(formatted.formattedDate, 'Tuesday, November 10, 2026');
});

test('getDynamicGreeting transitions accurately across all 4 periods of the day', () => {
  assert.equal(getDynamicGreeting(6), 'Good Morning');
  assert.equal(getDynamicGreeting(11), 'Good Morning');
  assert.equal(getDynamicGreeting(12), 'Good Afternoon');
  assert.equal(getDynamicGreeting(16), 'Good Afternoon');
  assert.equal(getDynamicGreeting(17), 'Good Evening');
  assert.equal(getDynamicGreeting(20), 'Good Evening');
  assert.equal(getDynamicGreeting(21), 'Good Night');
  assert.equal(getDynamicGreeting(2), 'Good Night');
});

test('getTimeZoneDetails formats IST — India Standard Time and UTC', () => {
  const date = new Date('2026-11-10T12:00:00.000Z');
  const ist = getTimeZoneDetails(date, 'Asia/Kolkata');
  assert.equal(ist.code, 'IST');
  assert.equal(ist.name, 'India Standard Time');
  assert.equal(ist.formatted, 'IST — India Standard Time');

  const utc = getTimeZoneDetails(date, 'UTC');
  assert.equal(utc.code, 'UTC');
  assert.equal(utc.formatted, 'UTC — Coordinated Universal Time');
});

test('getSevenSegmentBars returns accurate 7-segment states', () => {
  const eight = getSevenSegmentBars('8');
  assert.deepEqual(eight, [true, true, true, true, true, true, true]);
  const one = getSevenSegmentBars('1');
  assert.deepEqual(one, [false, true, true, false, false, false, false]);
});
