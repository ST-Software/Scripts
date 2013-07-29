describe('String Format', function () {

    beforeEach(module('stringFormatterModule'));

    describe('stringFormat', function () {

        it('should return template when no values are given', inject(function (stringFormatFilter) {
            expect(stringFormatFilter('template {0}')).toBe('template {0}');
        }));

        it('should return template when no template is given', inject(function (stringFormatFilter) {
            expect(stringFormatFilter()).toBe(undefined);
        }));

        it('should change {0} to first value in array', inject(function (stringFormatFilter) {
            expect(stringFormatFilter('template {0}', ['value'])).toBe('template value');
        }));

        it('should change {0} {1} {2} to matching values in array', inject(function (stringFormatFilter) {
            expect(stringFormatFilter('template {0} {1} {2}', ['value1', 'value2', 'value3'])).toBe('template value1 value2 value3');
        }));

        it('should remove the unused placeholder {2} when only 2 values are given', inject(function (stringFormatFilter) {
            expect(stringFormatFilter('template {0} {1} {2} end', ['value1', 'value2'])).toBe('template value1 value2  end'); // {2} replaced with ' '
        }));

        it('should work correctly with white characters in values', inject(function (stringFormatFilter) {
            expect(stringFormatFilter('template {0} {1} end', ['value with space', 'value2'])).toBe('template value with space value2 end');
        }));
})});