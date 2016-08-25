/**
 * Created by dank on 8/25/16.
 */
"use strict";

describe("URLService", function () {
    beforeEach(module('mms'));

    var ApplicationService, URLService, $httpBackend, $rootScope, $http, root;

    beforeEach(inject(function ($injector) {
        URLService   = $injector.get('URLService');
        $http        = $injector.get('$http');
        $httpBackend = $injector.get('$httpBackend');
        $rootScope   = $injector.get('$rootScope');
        it('should get the root url', inject(function () {
            root = URLService.getRoot();
            expect(root).toBeDefined();
        }));

        $httpBackend.when('GET', root + '/mmsversion').respond(
            function (method, url, data) {
                return [200, {mmsVersion: "2.3.8"}];
            }
        );
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("Method isTimestamp", function () {
        // To test the timestamp function, the string below is the format it requires to actually be
        // ^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}[+]?-\d{4}$/.test(version.trim())
        var myTimestamp = "8008-13-80T08:13:14.666-1232";
        it('should test if the given string value is a timestamp and return false', inject(function () {
            expect(URLService.isTimestamp("merp")).toBeFalsy();
        }));

        it('should test if the given timestamp is an actual timestamp and return true', inject(function () {
            expect(URLService.isTimestamp(myTimestamp)).toBeTruthy();
        }));
    });

    describe('Method getMmsVersionURL', function () {
        it('should return the root url with /mmsversion appended to the string', inject(function () {
            var mmsUrl = URLService.getMmsVersionURL();
            expect('/alfresco/service/mmsversion').toMatch(mmsUrl.toString());
        }))
    });

    describe('Method getConfigSnapshotsURL', function () {
        var tmpId        = 1234;
        var tmpWorkspace = "my_silly_workspace";
        var configSnapshotUrl;
        it('should generate a configuration snapshot url', inject(function () {
            configSnapshotUrl = root + "/workspaces/" + tmpWorkspace + "/configurations/" + tmpId + "/snapshots";
            expect(configSnapshotUrl).toMatch(URLService.getConfigSnapshotsURL(tmpId, tmpWorkspace));
        }));
    });

    describe('Method getProductSnapshotsURL', function () {
        var tmpId        = 1234;
        var tmpWorkspace = "my_silly_workspace";
        var tmpSite      = "Super_cat_memes_aahoooy";
        var productSnapshotUrl;
        it('should generate a configuration snapshot url', inject(function () {
            productSnapshotUrl = root + "/workspaces/" + tmpWorkspace + "/sites/" + tmpSite + "/products/" + tmpId + "/snapshots";
            expect(productSnapshotUrl).toMatch(URLService.getProductSnapshotsURL(tmpId, tmpSite, tmpWorkspace));
        }));
    });

    describe('Method getHtmlToPdfURL', function () {
        var tmpId        = 1234;
        var tmpWorkspace = "this_isnt_your_workspace";
        var tmpSite      = "dont_go_to_this_site";
        var htmlToPdfURL;
        it('should generate a configuration snapshot url', inject(function () {
            htmlToPdfURL = root + "/workspaces/" + tmpWorkspace + "/sites/" + tmpSite + "/documents/" + tmpId + "/htmlToPdf/123456789";
            expect(htmlToPdfURL).toMatch(URLService.getHtmlToPdfURL(tmpId, tmpSite, tmpWorkspace));
        }));
    });

    describe('Method getCheckLoginURL', function () {
        it("should create the checklogin url used to check login for Alfresco", inject(function () {
            var checkLoginUrl = root + '/checklogin';
            expect(checkLoginUrl).toMatch(URLService.getCheckLoginURL());
        }));
    });

    describe('Method getConfigsURL', function () {
        it('should create a configs url', inject(function () {
            var tmpWorkspace = "Mmmbop-ba-duba-dop";
            expect(root + '/workspaces/' + tmpWorkspace + "/configurations").toMatch(URLService.getConfigsURL(tmpWorkspace));
        }));
    });

    describe('Method getOwnedElementURL', function () {
        it('should create the url for all owned elements', inject(function () {
            
        }));
    });

});
