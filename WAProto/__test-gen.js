exports.encodeADVEncryptionType = {
  E2EE: 0,
  HOSTED: 1,
};

exports.decodeADVEncryptionType = {
  0: "E2EE",
  1: "HOSTED",
};

exports.encodeKeepType = {
  UNKNOWN: 0,
  KEEP_FOR_ALL: 1,
  UNDO_KEEP_FOR_ALL: 2,
};

exports.decodeKeepType = {
  0: "UNKNOWN",
  1: "KEEP_FOR_ALL",
  2: "UNDO_KEEP_FOR_ALL",
};

exports.encodeMediaVisibility = {
  DEFAULT: 0,
  OFF: 1,
  ON: 2,
};

exports.decodeMediaVisibility = {
  0: "DEFAULT",
  1: "OFF",
  2: "ON",
};

exports.encodeADVDeviceIdentity = function (message) {
  var bb = popByteBuffer();
  _encodeADVDeviceIdentity(message, bb);
  return toUint8Array(bb);
}

function _encodeADVDeviceIdentity(message, bb) {
  // optional uint32 rawId = 1;
  var $rawId = message.rawId;
  if ($rawId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $rawId);
  }

  // optional uint64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $timestamp);
  }

  // optional uint32 keyIndex = 3;
  var $keyIndex = message.keyIndex;
  if ($keyIndex !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $keyIndex);
  }

  // optional ADVEncryptionType accountType = 4;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, exports.encodeADVEncryptionType[$accountType]);
  }

  // optional ADVEncryptionType deviceType = 5;
  var $deviceType = message.deviceType;
  if ($deviceType !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, exports.encodeADVEncryptionType[$deviceType]);
  }
};

exports.decodeADVDeviceIdentity = function (binary) {
  return _decodeADVDeviceIdentity(wrapByteBuffer(binary));
}

function _decodeADVDeviceIdentity(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 rawId = 1;
      case 1: {
        message.rawId = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint64 timestamp = 2;
      case 2: {
        message.timestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint32 keyIndex = 3;
      case 3: {
        message.keyIndex = readVarint32(bb) >>> 0;
        break;
      }

      // optional ADVEncryptionType accountType = 4;
      case 4: {
        message.accountType = exports.decodeADVEncryptionType[readVarint32(bb)];
        break;
      }

      // optional ADVEncryptionType deviceType = 5;
      case 5: {
        message.deviceType = exports.decodeADVEncryptionType[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeADVKeyIndexList = function (message) {
  var bb = popByteBuffer();
  _encodeADVKeyIndexList(message, bb);
  return toUint8Array(bb);
}

function _encodeADVKeyIndexList(message, bb) {
  // optional uint32 rawId = 1;
  var $rawId = message.rawId;
  if ($rawId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $rawId);
  }

  // optional uint64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $timestamp);
  }

  // optional uint32 currentIndex = 3;
  var $currentIndex = message.currentIndex;
  if ($currentIndex !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $currentIndex);
  }

  // repeated uint32 validIndexes = 4;
  var array$validIndexes = message.validIndexes;
  if (array$validIndexes !== undefined) {
    var packed = popByteBuffer();
    for (var i = 0; i < array$validIndexes.length; i++) {
      var value = array$validIndexes[i];
      writeVarint32(packed, value);
    }
    writeVarint32(bb, 34);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional ADVEncryptionType accountType = 5;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, exports.encodeADVEncryptionType[$accountType]);
  }
};

exports.decodeADVKeyIndexList = function (binary) {
  return _decodeADVKeyIndexList(wrapByteBuffer(binary));
}

function _decodeADVKeyIndexList(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 rawId = 1;
      case 1: {
        message.rawId = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint64 timestamp = 2;
      case 2: {
        message.timestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint32 currentIndex = 3;
      case 3: {
        message.currentIndex = readVarint32(bb) >>> 0;
        break;
      }

      // repeated uint32 validIndexes = 4;
      case 4: {
        var values = message.validIndexes || (message.validIndexes = []);
        if ((tag & 7) === 2) {
          var outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb) >>> 0);
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb) >>> 0);
        }
        break;
      }

      // optional ADVEncryptionType accountType = 5;
      case 5: {
        message.accountType = exports.decodeADVEncryptionType[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeADVSignedDeviceIdentity = function (message) {
  var bb = popByteBuffer();
  _encodeADVSignedDeviceIdentity(message, bb);
  return toUint8Array(bb);
}

function _encodeADVSignedDeviceIdentity(message, bb) {
  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $details.length), writeBytes(bb, $details);
  }

  // optional bytes accountSignatureKey = 2;
  var $accountSignatureKey = message.accountSignatureKey;
  if ($accountSignatureKey !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $accountSignatureKey.length), writeBytes(bb, $accountSignatureKey);
  }

  // optional bytes accountSignature = 3;
  var $accountSignature = message.accountSignature;
  if ($accountSignature !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $accountSignature.length), writeBytes(bb, $accountSignature);
  }

  // optional bytes deviceSignature = 4;
  var $deviceSignature = message.deviceSignature;
  if ($deviceSignature !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $deviceSignature.length), writeBytes(bb, $deviceSignature);
  }
};

exports.decodeADVSignedDeviceIdentity = function (binary) {
  return _decodeADVSignedDeviceIdentity(wrapByteBuffer(binary));
}

function _decodeADVSignedDeviceIdentity(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes details = 1;
      case 1: {
        message.details = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes accountSignatureKey = 2;
      case 2: {
        message.accountSignatureKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes accountSignature = 3;
      case 3: {
        message.accountSignature = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes deviceSignature = 4;
      case 4: {
        message.deviceSignature = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeADVSignedDeviceIdentityHMAC = function (message) {
  var bb = popByteBuffer();
  _encodeADVSignedDeviceIdentityHMAC(message, bb);
  return toUint8Array(bb);
}

function _encodeADVSignedDeviceIdentityHMAC(message, bb) {
  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $details.length), writeBytes(bb, $details);
  }

  // optional bytes hmac = 2;
  var $hmac = message.hmac;
  if ($hmac !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $hmac.length), writeBytes(bb, $hmac);
  }

  // optional ADVEncryptionType accountType = 3;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, exports.encodeADVEncryptionType[$accountType]);
  }
};

exports.decodeADVSignedDeviceIdentityHMAC = function (binary) {
  return _decodeADVSignedDeviceIdentityHMAC(wrapByteBuffer(binary));
}

function _decodeADVSignedDeviceIdentityHMAC(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes details = 1;
      case 1: {
        message.details = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes hmac = 2;
      case 2: {
        message.hmac = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional ADVEncryptionType accountType = 3;
      case 3: {
        message.accountType = exports.decodeADVEncryptionType[readVarint32(bb)];
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeADVSignedKeyIndexList = function (message) {
  var bb = popByteBuffer();
  _encodeADVSignedKeyIndexList(message, bb);
  return toUint8Array(bb);
}

function _encodeADVSignedKeyIndexList(message, bb) {
  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $details.length), writeBytes(bb, $details);
  }

  // optional bytes accountSignature = 2;
  var $accountSignature = message.accountSignature;
  if ($accountSignature !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $accountSignature.length), writeBytes(bb, $accountSignature);
  }

  // optional bytes accountSignatureKey = 3;
  var $accountSignatureKey = message.accountSignatureKey;
  if ($accountSignatureKey !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $accountSignatureKey.length), writeBytes(bb, $accountSignatureKey);
  }
};

exports.decodeADVSignedKeyIndexList = function (binary) {
  return _decodeADVSignedKeyIndexList(wrapByteBuffer(binary));
}

function _decodeADVSignedKeyIndexList(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes details = 1;
      case 1: {
        message.details = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes accountSignature = 2;
      case 2: {
        message.accountSignature = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes accountSignatureKey = 3;
      case 3: {
        message.accountSignatureKey = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeActionLink = function (message) {
  var bb = popByteBuffer();
  _encodeActionLink(message, bb);
  return toUint8Array(bb);
}

function _encodeActionLink(message, bb) {
  // optional string url = 1;
  var $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $url);
  }

  // optional string buttonTitle = 2;
  var $buttonTitle = message.buttonTitle;
  if ($buttonTitle !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $buttonTitle);
  }
};

exports.decodeActionLink = function (binary) {
  return _decodeActionLink(wrapByteBuffer(binary));
}

function _decodeActionLink(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string url = 1;
      case 1: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional string buttonTitle = 2;
      case 2: {
        message.buttonTitle = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeAutoDownloadSettings = function (message) {
  var bb = popByteBuffer();
  _encodeAutoDownloadSettings(message, bb);
  return toUint8Array(bb);
}

function _encodeAutoDownloadSettings(message, bb) {
  // optional bool downloadImages = 1;
  var $downloadImages = message.downloadImages;
  if ($downloadImages !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $downloadImages ? 1 : 0);
  }

  // optional bool downloadAudio = 2;
  var $downloadAudio = message.downloadAudio;
  if ($downloadAudio !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $downloadAudio ? 1 : 0);
  }

  // optional bool downloadVideo = 3;
  var $downloadVideo = message.downloadVideo;
  if ($downloadVideo !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $downloadVideo ? 1 : 0);
  }

  // optional bool downloadDocuments = 4;
  var $downloadDocuments = message.downloadDocuments;
  if ($downloadDocuments !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $downloadDocuments ? 1 : 0);
  }
};

exports.decodeAutoDownloadSettings = function (binary) {
  return _decodeAutoDownloadSettings(wrapByteBuffer(binary));
}

function _decodeAutoDownloadSettings(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool downloadImages = 1;
      case 1: {
        message.downloadImages = !!readByte(bb);
        break;
      }

      // optional bool downloadAudio = 2;
      case 2: {
        message.downloadAudio = !!readByte(bb);
        break;
      }

      // optional bool downloadVideo = 3;
      case 3: {
        message.downloadVideo = !!readByte(bb);
        break;
      }

      // optional bool downloadDocuments = 4;
      case 4: {
        message.downloadDocuments = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeAvatarUserSettings = function (message) {
  var bb = popByteBuffer();
  _encodeAvatarUserSettings(message, bb);
  return toUint8Array(bb);
}

function _encodeAvatarUserSettings(message, bb) {
  // optional string fbid = 1;
  var $fbid = message.fbid;
  if ($fbid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $fbid);
  }

  // optional string password = 2;
  var $password = message.password;
  if ($password !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $password);
  }
};

exports.decodeAvatarUserSettings = function (binary) {
  return _decodeAvatarUserSettings(wrapByteBuffer(binary));
}

function _decodeAvatarUserSettings(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string fbid = 1;
      case 1: {
        message.fbid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string password = 2;
      case 2: {
        message.password = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBizAccountLinkInfo = function (message) {
  var bb = popByteBuffer();
  _encodeBizAccountLinkInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeBizAccountLinkInfo(message, bb) {
  // optional uint64 whatsappBizAcctFbid = 1;
  var $whatsappBizAcctFbid = message.whatsappBizAcctFbid;
  if ($whatsappBizAcctFbid !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $whatsappBizAcctFbid);
  }

  // optional string whatsappAcctNumber = 2;
  var $whatsappAcctNumber = message.whatsappAcctNumber;
  if ($whatsappAcctNumber !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $whatsappAcctNumber);
  }

  // optional uint64 issueTime = 3;
  var $issueTime = message.issueTime;
  if ($issueTime !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $issueTime);
  }

  // optional HostStorageType hostStorage = 4;
  var $hostStorage = message.hostStorage;
  if ($hostStorage !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeHostStorageType($hostStorage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AccountType accountType = 5;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeAccountType($accountType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeBizAccountLinkInfo = function (binary) {
  return _decodeBizAccountLinkInfo(wrapByteBuffer(binary));
}

function _decodeBizAccountLinkInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 whatsappBizAcctFbid = 1;
      case 1: {
        message.whatsappBizAcctFbid = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string whatsappAcctNumber = 2;
      case 2: {
        message.whatsappAcctNumber = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 issueTime = 3;
      case 3: {
        message.issueTime = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional HostStorageType hostStorage = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.hostStorage = _decodeHostStorageType(bb);
        bb.limit = limit;
        break;
      }

      // optional AccountType accountType = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.accountType = _decodeAccountType(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBizAccountPayload = function (message) {
  var bb = popByteBuffer();
  _encodeBizAccountPayload(message, bb);
  return toUint8Array(bb);
}

function _encodeBizAccountPayload(message, bb) {
  // optional VerifiedNameCertificate vnameCert = 1;
  var $vnameCert = message.vnameCert;
  if ($vnameCert !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeVerifiedNameCertificate($vnameCert, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes bizAcctLinkInfo = 2;
  var $bizAcctLinkInfo = message.bizAcctLinkInfo;
  if ($bizAcctLinkInfo !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $bizAcctLinkInfo.length), writeBytes(bb, $bizAcctLinkInfo);
  }
};

exports.decodeBizAccountPayload = function (binary) {
  return _decodeBizAccountPayload(wrapByteBuffer(binary));
}

function _decodeBizAccountPayload(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional VerifiedNameCertificate vnameCert = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.vnameCert = _decodeVerifiedNameCertificate(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes bizAcctLinkInfo = 2;
      case 2: {
        message.bizAcctLinkInfo = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBizIdentityInfo = function (message) {
  var bb = popByteBuffer();
  _encodeBizIdentityInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeBizIdentityInfo(message, bb) {
  // optional VerifiedLevelValue vlevel = 1;
  var $vlevel = message.vlevel;
  if ($vlevel !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeVerifiedLevelValue($vlevel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional VerifiedNameCertificate vnameCert = 2;
  var $vnameCert = message.vnameCert;
  if ($vnameCert !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeVerifiedNameCertificate($vnameCert, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool signed = 3;
  var $signed = message.signed;
  if ($signed !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $signed ? 1 : 0);
  }

  // optional bool revoked = 4;
  var $revoked = message.revoked;
  if ($revoked !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $revoked ? 1 : 0);
  }

  // optional HostStorageType hostStorage = 5;
  var $hostStorage = message.hostStorage;
  if ($hostStorage !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeHostStorageType($hostStorage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ActualActorsType actualActors = 6;
  var $actualActors = message.actualActors;
  if ($actualActors !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeActualActorsType($actualActors, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 privacyModeTs = 7;
  var $privacyModeTs = message.privacyModeTs;
  if ($privacyModeTs !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $privacyModeTs);
  }

  // optional uint64 featureControls = 8;
  var $featureControls = message.featureControls;
  if ($featureControls !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, $featureControls);
  }
};

exports.decodeBizIdentityInfo = function (binary) {
  return _decodeBizIdentityInfo(wrapByteBuffer(binary));
}

function _decodeBizIdentityInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional VerifiedLevelValue vlevel = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.vlevel = _decodeVerifiedLevelValue(bb);
        bb.limit = limit;
        break;
      }

      // optional VerifiedNameCertificate vnameCert = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.vnameCert = _decodeVerifiedNameCertificate(bb);
        bb.limit = limit;
        break;
      }

      // optional bool signed = 3;
      case 3: {
        message.signed = !!readByte(bb);
        break;
      }

      // optional bool revoked = 4;
      case 4: {
        message.revoked = !!readByte(bb);
        break;
      }

      // optional HostStorageType hostStorage = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.hostStorage = _decodeHostStorageType(bb);
        bb.limit = limit;
        break;
      }

      // optional ActualActorsType actualActors = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.actualActors = _decodeActualActorsType(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 privacyModeTs = 7;
      case 7: {
        message.privacyModeTs = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint64 featureControls = 8;
      case 8: {
        message.featureControls = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBotAvatarMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeBotAvatarMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeBotAvatarMetadata(message, bb) {
  // optional uint32 sentiment = 1;
  var $sentiment = message.sentiment;
  if ($sentiment !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $sentiment);
  }

  // optional string behaviorGraph = 2;
  var $behaviorGraph = message.behaviorGraph;
  if ($behaviorGraph !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $behaviorGraph);
  }

  // optional uint32 action = 3;
  var $action = message.action;
  if ($action !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $action);
  }

  // optional uint32 intensity = 4;
  var $intensity = message.intensity;
  if ($intensity !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, $intensity);
  }

  // optional uint32 wordCount = 5;
  var $wordCount = message.wordCount;
  if ($wordCount !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, $wordCount);
  }
};

exports.decodeBotAvatarMetadata = function (binary) {
  return _decodeBotAvatarMetadata(wrapByteBuffer(binary));
}

function _decodeBotAvatarMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 sentiment = 1;
      case 1: {
        message.sentiment = readVarint32(bb) >>> 0;
        break;
      }

      // optional string behaviorGraph = 2;
      case 2: {
        message.behaviorGraph = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 action = 3;
      case 3: {
        message.action = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 intensity = 4;
      case 4: {
        message.intensity = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 wordCount = 5;
      case 5: {
        message.wordCount = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBotMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeBotMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeBotMetadata(message, bb) {
  // optional BotAvatarMetadata avatarMetadata = 1;
  var $avatarMetadata = message.avatarMetadata;
  if ($avatarMetadata !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeBotAvatarMetadata($avatarMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string personaId = 2;
  var $personaId = message.personaId;
  if ($personaId !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $personaId);
  }

  // optional BotPluginMetadata pluginMetadata = 3;
  var $pluginMetadata = message.pluginMetadata;
  if ($pluginMetadata !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeBotPluginMetadata($pluginMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional BotSuggestedPromptMetadata suggestedPromptMetadata = 4;
  var $suggestedPromptMetadata = message.suggestedPromptMetadata;
  if ($suggestedPromptMetadata !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeBotSuggestedPromptMetadata($suggestedPromptMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string invokerJid = 5;
  var $invokerJid = message.invokerJid;
  if ($invokerJid !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $invokerJid);
  }

  // optional BotSearchMetadata searchMetadata = 6;
  var $searchMetadata = message.searchMetadata;
  if ($searchMetadata !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeBotSearchMetadata($searchMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeBotMetadata = function (binary) {
  return _decodeBotMetadata(wrapByteBuffer(binary));
}

function _decodeBotMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional BotAvatarMetadata avatarMetadata = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.avatarMetadata = _decodeBotAvatarMetadata(bb);
        bb.limit = limit;
        break;
      }

      // optional string personaId = 2;
      case 2: {
        message.personaId = readString(bb, readVarint32(bb));
        break;
      }

      // optional BotPluginMetadata pluginMetadata = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.pluginMetadata = _decodeBotPluginMetadata(bb);
        bb.limit = limit;
        break;
      }

      // optional BotSuggestedPromptMetadata suggestedPromptMetadata = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.suggestedPromptMetadata = _decodeBotSuggestedPromptMetadata(bb);
        bb.limit = limit;
        break;
      }

      // optional string invokerJid = 5;
      case 5: {
        message.invokerJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional BotSearchMetadata searchMetadata = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.searchMetadata = _decodeBotSearchMetadata(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBotPluginMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeBotPluginMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeBotPluginMetadata(message, bb) {
  // optional SearchProvider provider = 1;
  var $provider = message.provider;
  if ($provider !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeSearchProvider($provider, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PluginType pluginType = 2;
  var $pluginType = message.pluginType;
  if ($pluginType !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodePluginType($pluginType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string thumbnailCdnUrl = 3;
  var $thumbnailCdnUrl = message.thumbnailCdnUrl;
  if ($thumbnailCdnUrl !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $thumbnailCdnUrl);
  }

  // optional string profilePhotoCdnUrl = 4;
  var $profilePhotoCdnUrl = message.profilePhotoCdnUrl;
  if ($profilePhotoCdnUrl !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $profilePhotoCdnUrl);
  }

  // optional string searchProviderUrl = 5;
  var $searchProviderUrl = message.searchProviderUrl;
  if ($searchProviderUrl !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $searchProviderUrl);
  }

  // optional uint32 referenceIndex = 6;
  var $referenceIndex = message.referenceIndex;
  if ($referenceIndex !== undefined) {
    writeVarint32(bb, 48);
    writeVarint32(bb, $referenceIndex);
  }

  // optional uint32 expectedLinksCount = 7;
  var $expectedLinksCount = message.expectedLinksCount;
  if ($expectedLinksCount !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, $expectedLinksCount);
  }

  // optional string searchQuery = 9;
  var $searchQuery = message.searchQuery;
  if ($searchQuery !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $searchQuery);
  }

  // optional MessageKey parentPluginMessageKey = 10;
  var $parentPluginMessageKey = message.parentPluginMessageKey;
  if ($parentPluginMessageKey !== undefined) {
    writeVarint32(bb, 82);
    var nested = popByteBuffer();
    _encodeMessageKey($parentPluginMessageKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeBotPluginMetadata = function (binary) {
  return _decodeBotPluginMetadata(wrapByteBuffer(binary));
}

function _decodeBotPluginMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional SearchProvider provider = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.provider = _decodeSearchProvider(bb);
        bb.limit = limit;
        break;
      }

      // optional PluginType pluginType = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.pluginType = _decodePluginType(bb);
        bb.limit = limit;
        break;
      }

      // optional string thumbnailCdnUrl = 3;
      case 3: {
        message.thumbnailCdnUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string profilePhotoCdnUrl = 4;
      case 4: {
        message.profilePhotoCdnUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string searchProviderUrl = 5;
      case 5: {
        message.searchProviderUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 referenceIndex = 6;
      case 6: {
        message.referenceIndex = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 expectedLinksCount = 7;
      case 7: {
        message.expectedLinksCount = readVarint32(bb) >>> 0;
        break;
      }

      // optional string searchQuery = 9;
      case 9: {
        message.searchQuery = readString(bb, readVarint32(bb));
        break;
      }

      // optional MessageKey parentPluginMessageKey = 10;
      case 10: {
        var limit = pushTemporaryLength(bb);
        message.parentPluginMessageKey = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBotSearchMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeBotSearchMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeBotSearchMetadata(message, bb) {
  // optional string sessionId = 1;
  var $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $sessionId);
  }
};

exports.decodeBotSearchMetadata = function (binary) {
  return _decodeBotSearchMetadata(wrapByteBuffer(binary));
}

function _decodeBotSearchMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string sessionId = 1;
      case 1: {
        message.sessionId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeBotSuggestedPromptMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeBotSuggestedPromptMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeBotSuggestedPromptMetadata(message, bb) {
  // repeated string suggestedPrompts = 1;
  var array$suggestedPrompts = message.suggestedPrompts;
  if (array$suggestedPrompts !== undefined) {
    for (var i = 0; i < array$suggestedPrompts.length; i++) {
      var value = array$suggestedPrompts[i];
      writeVarint32(bb, 10);
      writeString(bb, value);
    }
  }

  // optional uint32 selectedPromptIndex = 2;
  var $selectedPromptIndex = message.selectedPromptIndex;
  if ($selectedPromptIndex !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $selectedPromptIndex);
  }
};

exports.decodeBotSuggestedPromptMetadata = function (binary) {
  return _decodeBotSuggestedPromptMetadata(wrapByteBuffer(binary));
}

function _decodeBotSuggestedPromptMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated string suggestedPrompts = 1;
      case 1: {
        var values = message.suggestedPrompts || (message.suggestedPrompts = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional uint32 selectedPromptIndex = 2;
      case 2: {
        message.selectedPromptIndex = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeCallLogRecord = function (message) {
  var bb = popByteBuffer();
  _encodeCallLogRecord(message, bb);
  return toUint8Array(bb);
}

function _encodeCallLogRecord(message, bb) {
  // optional CallResult callResult = 1;
  var $callResult = message.callResult;
  if ($callResult !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeCallResult($callResult, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool isDndMode = 2;
  var $isDndMode = message.isDndMode;
  if ($isDndMode !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $isDndMode ? 1 : 0);
  }

  // optional SilenceReason silenceReason = 3;
  var $silenceReason = message.silenceReason;
  if ($silenceReason !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeSilenceReason($silenceReason, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 duration = 4;
  var $duration = message.duration;
  if ($duration !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $duration);
  }

  // optional int64 startTime = 5;
  var $startTime = message.startTime;
  if ($startTime !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $startTime);
  }

  // optional bool isIncoming = 6;
  var $isIncoming = message.isIncoming;
  if ($isIncoming !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $isIncoming ? 1 : 0);
  }

  // optional bool isVideo = 7;
  var $isVideo = message.isVideo;
  if ($isVideo !== undefined) {
    writeVarint32(bb, 56);
    writeByte(bb, $isVideo ? 1 : 0);
  }

  // optional bool isCallLink = 8;
  var $isCallLink = message.isCallLink;
  if ($isCallLink !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $isCallLink ? 1 : 0);
  }

  // optional string callLinkToken = 9;
  var $callLinkToken = message.callLinkToken;
  if ($callLinkToken !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $callLinkToken);
  }

  // optional string scheduledCallId = 10;
  var $scheduledCallId = message.scheduledCallId;
  if ($scheduledCallId !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $scheduledCallId);
  }

  // optional string callId = 11;
  var $callId = message.callId;
  if ($callId !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $callId);
  }

  // optional string callCreatorJid = 12;
  var $callCreatorJid = message.callCreatorJid;
  if ($callCreatorJid !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $callCreatorJid);
  }

  // optional string groupJid = 13;
  var $groupJid = message.groupJid;
  if ($groupJid !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $groupJid);
  }

  // repeated ParticipantInfo participants = 14;
  var array$participants = message.participants;
  if (array$participants !== undefined) {
    for (var i = 0; i < array$participants.length; i++) {
      var value = array$participants[i];
      writeVarint32(bb, 114);
      var nested = popByteBuffer();
      _encodeParticipantInfo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional CallType callType = 15;
  var $callType = message.callType;
  if ($callType !== undefined) {
    writeVarint32(bb, 122);
    var nested = popByteBuffer();
    _encodeCallType($callType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeCallLogRecord = function (binary) {
  return _decodeCallLogRecord(wrapByteBuffer(binary));
}

function _decodeCallLogRecord(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional CallResult callResult = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.callResult = _decodeCallResult(bb);
        bb.limit = limit;
        break;
      }

      // optional bool isDndMode = 2;
      case 2: {
        message.isDndMode = !!readByte(bb);
        break;
      }

      // optional SilenceReason silenceReason = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.silenceReason = _decodeSilenceReason(bb);
        bb.limit = limit;
        break;
      }

      // optional int64 duration = 4;
      case 4: {
        message.duration = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 startTime = 5;
      case 5: {
        message.startTime = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool isIncoming = 6;
      case 6: {
        message.isIncoming = !!readByte(bb);
        break;
      }

      // optional bool isVideo = 7;
      case 7: {
        message.isVideo = !!readByte(bb);
        break;
      }

      // optional bool isCallLink = 8;
      case 8: {
        message.isCallLink = !!readByte(bb);
        break;
      }

      // optional string callLinkToken = 9;
      case 9: {
        message.callLinkToken = readString(bb, readVarint32(bb));
        break;
      }

      // optional string scheduledCallId = 10;
      case 10: {
        message.scheduledCallId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string callId = 11;
      case 11: {
        message.callId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string callCreatorJid = 12;
      case 12: {
        message.callCreatorJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string groupJid = 13;
      case 13: {
        message.groupJid = readString(bb, readVarint32(bb));
        break;
      }

      // repeated ParticipantInfo participants = 14;
      case 14: {
        var limit = pushTemporaryLength(bb);
        var values = message.participants || (message.participants = []);
        values.push(_decodeParticipantInfo(bb));
        bb.limit = limit;
        break;
      }

      // optional CallType callType = 15;
      case 15: {
        var limit = pushTemporaryLength(bb);
        message.callType = _decodeCallType(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeCertChain = function (message) {
  var bb = popByteBuffer();
  _encodeCertChain(message, bb);
  return toUint8Array(bb);
}

function _encodeCertChain(message, bb) {
  // optional NoiseCertificate leaf = 1;
  var $leaf = message.leaf;
  if ($leaf !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeNoiseCertificate($leaf, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional NoiseCertificate intermediate = 2;
  var $intermediate = message.intermediate;
  if ($intermediate !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeNoiseCertificate($intermediate, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeCertChain = function (binary) {
  return _decodeCertChain(wrapByteBuffer(binary));
}

function _decodeCertChain(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional NoiseCertificate leaf = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.leaf = _decodeNoiseCertificate(bb);
        bb.limit = limit;
        break;
      }

      // optional NoiseCertificate intermediate = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.intermediate = _decodeNoiseCertificate(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeChatLockSettings = function (message) {
  var bb = popByteBuffer();
  _encodeChatLockSettings(message, bb);
  return toUint8Array(bb);
}

function _encodeChatLockSettings(message, bb) {
  // optional bool hideLockedChats = 1;
  var $hideLockedChats = message.hideLockedChats;
  if ($hideLockedChats !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $hideLockedChats ? 1 : 0);
  }

  // optional UserPassword secretCode = 2;
  var $secretCode = message.secretCode;
  if ($secretCode !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeUserPassword($secretCode, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeChatLockSettings = function (binary) {
  return _decodeChatLockSettings(wrapByteBuffer(binary));
}

function _decodeChatLockSettings(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool hideLockedChats = 1;
      case 1: {
        message.hideLockedChats = !!readByte(bb);
        break;
      }

      // optional UserPassword secretCode = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.secretCode = _decodeUserPassword(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeChatRowOpaqueData = function (message) {
  var bb = popByteBuffer();
  _encodeChatRowOpaqueData(message, bb);
  return toUint8Array(bb);
}

function _encodeChatRowOpaqueData(message, bb) {
  // optional DraftMessage draftMessage = 1;
  var $draftMessage = message.draftMessage;
  if ($draftMessage !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeDraftMessage($draftMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeChatRowOpaqueData = function (binary) {
  return _decodeChatRowOpaqueData(wrapByteBuffer(binary));
}

function _decodeChatRowOpaqueData(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional DraftMessage draftMessage = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.draftMessage = _decodeDraftMessage(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeClientPayload = function (message) {
  var bb = popByteBuffer();
  _encodeClientPayload(message, bb);
  return toUint8Array(bb);
}

function _encodeClientPayload(message, bb) {
  // optional uint64 username = 1;
  var $username = message.username;
  if ($username !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $username);
  }

  // optional bool passive = 3;
  var $passive = message.passive;
  if ($passive !== undefined) {
    writeVarint32(bb, 24);
    writeByte(bb, $passive ? 1 : 0);
  }

  // optional UserAgent userAgent = 5;
  var $userAgent = message.userAgent;
  if ($userAgent !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeUserAgent($userAgent, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional WebInfo webInfo = 6;
  var $webInfo = message.webInfo;
  if ($webInfo !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeWebInfo($webInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string pushName = 7;
  var $pushName = message.pushName;
  if ($pushName !== undefined) {
    writeVarint32(bb, 58);
    writeString(bb, $pushName);
  }

  // optional sfixed32 sessionId = 9;
  var $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    writeVarint32(bb, 77);
    writeInt32(bb, $sessionId);
  }

  // optional bool shortConnect = 10;
  var $shortConnect = message.shortConnect;
  if ($shortConnect !== undefined) {
    writeVarint32(bb, 80);
    writeByte(bb, $shortConnect ? 1 : 0);
  }

  // optional ConnectType connectType = 12;
  var $connectType = message.connectType;
  if ($connectType !== undefined) {
    writeVarint32(bb, 98);
    var nested = popByteBuffer();
    _encodeConnectType($connectType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ConnectReason connectReason = 13;
  var $connectReason = message.connectReason;
  if ($connectReason !== undefined) {
    writeVarint32(bb, 106);
    var nested = popByteBuffer();
    _encodeConnectReason($connectReason, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated int32 shards = 14;
  var array$shards = message.shards;
  if (array$shards !== undefined) {
    var packed = popByteBuffer();
    for (var i = 0; i < array$shards.length; i++) {
      var value = array$shards[i];
      writeVarint64(packed, intToLong(value));
    }
    writeVarint32(bb, 114);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional DNSSource dnsSource = 15;
  var $dnsSource = message.dnsSource;
  if ($dnsSource !== undefined) {
    writeVarint32(bb, 122);
    var nested = popByteBuffer();
    _encodeDNSSource($dnsSource, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint32 connectAttemptCount = 16;
  var $connectAttemptCount = message.connectAttemptCount;
  if ($connectAttemptCount !== undefined) {
    writeVarint32(bb, 128);
    writeVarint32(bb, $connectAttemptCount);
  }

  // optional uint32 device = 18;
  var $device = message.device;
  if ($device !== undefined) {
    writeVarint32(bb, 144);
    writeVarint32(bb, $device);
  }

  // optional DevicePairingRegistrationData devicePairingData = 19;
  var $devicePairingData = message.devicePairingData;
  if ($devicePairingData !== undefined) {
    writeVarint32(bb, 154);
    var nested = popByteBuffer();
    _encodeDevicePairingRegistrationData($devicePairingData, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Product product = 20;
  var $product = message.product;
  if ($product !== undefined) {
    writeVarint32(bb, 162);
    var nested = popByteBuffer();
    _encodeProduct($product, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes fbCat = 21;
  var $fbCat = message.fbCat;
  if ($fbCat !== undefined) {
    writeVarint32(bb, 170);
    writeVarint32(bb, $fbCat.length), writeBytes(bb, $fbCat);
  }

  // optional bytes fbUserAgent = 22;
  var $fbUserAgent = message.fbUserAgent;
  if ($fbUserAgent !== undefined) {
    writeVarint32(bb, 178);
    writeVarint32(bb, $fbUserAgent.length), writeBytes(bb, $fbUserAgent);
  }

  // optional bool oc = 23;
  var $oc = message.oc;
  if ($oc !== undefined) {
    writeVarint32(bb, 184);
    writeByte(bb, $oc ? 1 : 0);
  }

  // optional int32 lc = 24;
  var $lc = message.lc;
  if ($lc !== undefined) {
    writeVarint32(bb, 192);
    writeVarint64(bb, intToLong($lc));
  }

  // optional IOSAppExtension iosAppExtension = 30;
  var $iosAppExtension = message.iosAppExtension;
  if ($iosAppExtension !== undefined) {
    writeVarint32(bb, 242);
    var nested = popByteBuffer();
    _encodeIOSAppExtension($iosAppExtension, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 fbAppId = 31;
  var $fbAppId = message.fbAppId;
  if ($fbAppId !== undefined) {
    writeVarint32(bb, 248);
    writeVarint64(bb, $fbAppId);
  }

  // optional bytes fbDeviceId = 32;
  var $fbDeviceId = message.fbDeviceId;
  if ($fbDeviceId !== undefined) {
    writeVarint32(bb, 258);
    writeVarint32(bb, $fbDeviceId.length), writeBytes(bb, $fbDeviceId);
  }

  // optional bool pull = 33;
  var $pull = message.pull;
  if ($pull !== undefined) {
    writeVarint32(bb, 264);
    writeByte(bb, $pull ? 1 : 0);
  }

  // optional bytes paddingBytes = 34;
  var $paddingBytes = message.paddingBytes;
  if ($paddingBytes !== undefined) {
    writeVarint32(bb, 274);
    writeVarint32(bb, $paddingBytes.length), writeBytes(bb, $paddingBytes);
  }

  // optional int32 yearClass = 36;
  var $yearClass = message.yearClass;
  if ($yearClass !== undefined) {
    writeVarint32(bb, 288);
    writeVarint64(bb, intToLong($yearClass));
  }

  // optional int32 memClass = 37;
  var $memClass = message.memClass;
  if ($memClass !== undefined) {
    writeVarint32(bb, 296);
    writeVarint64(bb, intToLong($memClass));
  }

  // optional InteropData interopData = 38;
  var $interopData = message.interopData;
  if ($interopData !== undefined) {
    writeVarint32(bb, 306);
    var nested = popByteBuffer();
    _encodeInteropData($interopData, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeClientPayload = function (binary) {
  return _decodeClientPayload(wrapByteBuffer(binary));
}

function _decodeClientPayload(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 username = 1;
      case 1: {
        message.username = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bool passive = 3;
      case 3: {
        message.passive = !!readByte(bb);
        break;
      }

      // optional UserAgent userAgent = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.userAgent = _decodeUserAgent(bb);
        bb.limit = limit;
        break;
      }

      // optional WebInfo webInfo = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.webInfo = _decodeWebInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional string pushName = 7;
      case 7: {
        message.pushName = readString(bb, readVarint32(bb));
        break;
      }

      // optional sfixed32 sessionId = 9;
      case 9: {
        message.sessionId = readInt32(bb);
        break;
      }

      // optional bool shortConnect = 10;
      case 10: {
        message.shortConnect = !!readByte(bb);
        break;
      }

      // optional ConnectType connectType = 12;
      case 12: {
        var limit = pushTemporaryLength(bb);
        message.connectType = _decodeConnectType(bb);
        bb.limit = limit;
        break;
      }

      // optional ConnectReason connectReason = 13;
      case 13: {
        var limit = pushTemporaryLength(bb);
        message.connectReason = _decodeConnectReason(bb);
        bb.limit = limit;
        break;
      }

      // repeated int32 shards = 14;
      case 14: {
        var values = message.shards || (message.shards = []);
        if ((tag & 7) === 2) {
          var outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb));
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb));
        }
        break;
      }

      // optional DNSSource dnsSource = 15;
      case 15: {
        var limit = pushTemporaryLength(bb);
        message.dnsSource = _decodeDNSSource(bb);
        bb.limit = limit;
        break;
      }

      // optional uint32 connectAttemptCount = 16;
      case 16: {
        message.connectAttemptCount = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 device = 18;
      case 18: {
        message.device = readVarint32(bb) >>> 0;
        break;
      }

      // optional DevicePairingRegistrationData devicePairingData = 19;
      case 19: {
        var limit = pushTemporaryLength(bb);
        message.devicePairingData = _decodeDevicePairingRegistrationData(bb);
        bb.limit = limit;
        break;
      }

      // optional Product product = 20;
      case 20: {
        var limit = pushTemporaryLength(bb);
        message.product = _decodeProduct(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes fbCat = 21;
      case 21: {
        message.fbCat = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes fbUserAgent = 22;
      case 22: {
        message.fbUserAgent = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bool oc = 23;
      case 23: {
        message.oc = !!readByte(bb);
        break;
      }

      // optional int32 lc = 24;
      case 24: {
        message.lc = readVarint32(bb);
        break;
      }

      // optional IOSAppExtension iosAppExtension = 30;
      case 30: {
        var limit = pushTemporaryLength(bb);
        message.iosAppExtension = _decodeIOSAppExtension(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 fbAppId = 31;
      case 31: {
        message.fbAppId = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bytes fbDeviceId = 32;
      case 32: {
        message.fbDeviceId = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bool pull = 33;
      case 33: {
        message.pull = !!readByte(bb);
        break;
      }

      // optional bytes paddingBytes = 34;
      case 34: {
        message.paddingBytes = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional int32 yearClass = 36;
      case 36: {
        message.yearClass = readVarint32(bb);
        break;
      }

      // optional int32 memClass = 37;
      case 37: {
        message.memClass = readVarint32(bb);
        break;
      }

      // optional InteropData interopData = 38;
      case 38: {
        var limit = pushTemporaryLength(bb);
        message.interopData = _decodeInteropData(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeCommentMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeCommentMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeCommentMetadata(message, bb) {
  // optional MessageKey commentParentKey = 1;
  var $commentParentKey = message.commentParentKey;
  if ($commentParentKey !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeMessageKey($commentParentKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint32 replyCount = 2;
  var $replyCount = message.replyCount;
  if ($replyCount !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $replyCount);
  }
};

exports.decodeCommentMetadata = function (binary) {
  return _decodeCommentMetadata(wrapByteBuffer(binary));
}

function _decodeCommentMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional MessageKey commentParentKey = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.commentParentKey = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional uint32 replyCount = 2;
      case 2: {
        message.replyCount = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeContextInfo = function (message) {
  var bb = popByteBuffer();
  _encodeContextInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeContextInfo(message, bb) {
  // optional string stanzaId = 1;
  var $stanzaId = message.stanzaId;
  if ($stanzaId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $stanzaId);
  }

  // optional string participant = 2;
  var $participant = message.participant;
  if ($participant !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $participant);
  }

  // optional Message quotedMessage = 3;
  var $quotedMessage = message.quotedMessage;
  if ($quotedMessage !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeMessage($quotedMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string remoteJid = 4;
  var $remoteJid = message.remoteJid;
  if ($remoteJid !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $remoteJid);
  }

  // repeated string mentionedJid = 15;
  var array$mentionedJid = message.mentionedJid;
  if (array$mentionedJid !== undefined) {
    for (var i = 0; i < array$mentionedJid.length; i++) {
      var value = array$mentionedJid[i];
      writeVarint32(bb, 122);
      writeString(bb, value);
    }
  }

  // optional string conversionSource = 18;
  var $conversionSource = message.conversionSource;
  if ($conversionSource !== undefined) {
    writeVarint32(bb, 146);
    writeString(bb, $conversionSource);
  }

  // optional bytes conversionData = 19;
  var $conversionData = message.conversionData;
  if ($conversionData !== undefined) {
    writeVarint32(bb, 154);
    writeVarint32(bb, $conversionData.length), writeBytes(bb, $conversionData);
  }

  // optional uint32 conversionDelaySeconds = 20;
  var $conversionDelaySeconds = message.conversionDelaySeconds;
  if ($conversionDelaySeconds !== undefined) {
    writeVarint32(bb, 160);
    writeVarint32(bb, $conversionDelaySeconds);
  }

  // optional uint32 forwardingScore = 21;
  var $forwardingScore = message.forwardingScore;
  if ($forwardingScore !== undefined) {
    writeVarint32(bb, 168);
    writeVarint32(bb, $forwardingScore);
  }

  // optional bool isForwarded = 22;
  var $isForwarded = message.isForwarded;
  if ($isForwarded !== undefined) {
    writeVarint32(bb, 176);
    writeByte(bb, $isForwarded ? 1 : 0);
  }

  // optional AdReplyInfo quotedAd = 23;
  var $quotedAd = message.quotedAd;
  if ($quotedAd !== undefined) {
    writeVarint32(bb, 186);
    var nested = popByteBuffer();
    _encodeAdReplyInfo($quotedAd, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MessageKey placeholderKey = 24;
  var $placeholderKey = message.placeholderKey;
  if ($placeholderKey !== undefined) {
    writeVarint32(bb, 194);
    var nested = popByteBuffer();
    _encodeMessageKey($placeholderKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint32 expiration = 25;
  var $expiration = message.expiration;
  if ($expiration !== undefined) {
    writeVarint32(bb, 200);
    writeVarint32(bb, $expiration);
  }

  // optional int64 ephemeralSettingTimestamp = 26;
  var $ephemeralSettingTimestamp = message.ephemeralSettingTimestamp;
  if ($ephemeralSettingTimestamp !== undefined) {
    writeVarint32(bb, 208);
    writeVarint64(bb, $ephemeralSettingTimestamp);
  }

  // optional bytes ephemeralSharedSecret = 27;
  var $ephemeralSharedSecret = message.ephemeralSharedSecret;
  if ($ephemeralSharedSecret !== undefined) {
    writeVarint32(bb, 218);
    writeVarint32(bb, $ephemeralSharedSecret.length), writeBytes(bb, $ephemeralSharedSecret);
  }

  // optional ExternalAdReplyInfo externalAdReply = 28;
  var $externalAdReply = message.externalAdReply;
  if ($externalAdReply !== undefined) {
    writeVarint32(bb, 226);
    var nested = popByteBuffer();
    _encodeExternalAdReplyInfo($externalAdReply, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string entryPointConversionSource = 29;
  var $entryPointConversionSource = message.entryPointConversionSource;
  if ($entryPointConversionSource !== undefined) {
    writeVarint32(bb, 234);
    writeString(bb, $entryPointConversionSource);
  }

  // optional string entryPointConversionApp = 30;
  var $entryPointConversionApp = message.entryPointConversionApp;
  if ($entryPointConversionApp !== undefined) {
    writeVarint32(bb, 242);
    writeString(bb, $entryPointConversionApp);
  }

  // optional uint32 entryPointConversionDelaySeconds = 31;
  var $entryPointConversionDelaySeconds = message.entryPointConversionDelaySeconds;
  if ($entryPointConversionDelaySeconds !== undefined) {
    writeVarint32(bb, 248);
    writeVarint32(bb, $entryPointConversionDelaySeconds);
  }

  // optional DisappearingMode disappearingMode = 32;
  var $disappearingMode = message.disappearingMode;
  if ($disappearingMode !== undefined) {
    writeVarint32(bb, 258);
    var nested = popByteBuffer();
    _encodeDisappearingMode($disappearingMode, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ActionLink actionLink = 33;
  var $actionLink = message.actionLink;
  if ($actionLink !== undefined) {
    writeVarint32(bb, 266);
    var nested = popByteBuffer();
    _encodeActionLink($actionLink, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string groupSubject = 34;
  var $groupSubject = message.groupSubject;
  if ($groupSubject !== undefined) {
    writeVarint32(bb, 274);
    writeString(bb, $groupSubject);
  }

  // optional string parentGroupJid = 35;
  var $parentGroupJid = message.parentGroupJid;
  if ($parentGroupJid !== undefined) {
    writeVarint32(bb, 282);
    writeString(bb, $parentGroupJid);
  }

  // optional string trustBannerType = 37;
  var $trustBannerType = message.trustBannerType;
  if ($trustBannerType !== undefined) {
    writeVarint32(bb, 298);
    writeString(bb, $trustBannerType);
  }

  // optional uint32 trustBannerAction = 38;
  var $trustBannerAction = message.trustBannerAction;
  if ($trustBannerAction !== undefined) {
    writeVarint32(bb, 304);
    writeVarint32(bb, $trustBannerAction);
  }

  // optional bool isSampled = 39;
  var $isSampled = message.isSampled;
  if ($isSampled !== undefined) {
    writeVarint32(bb, 312);
    writeByte(bb, $isSampled ? 1 : 0);
  }

  // repeated GroupMention groupMentions = 40;
  var array$groupMentions = message.groupMentions;
  if (array$groupMentions !== undefined) {
    for (var i = 0; i < array$groupMentions.length; i++) {
      var value = array$groupMentions[i];
      writeVarint32(bb, 322);
      var nested = popByteBuffer();
      _encodeGroupMention(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional UTMInfo utm = 41;
  var $utm = message.utm;
  if ($utm !== undefined) {
    writeVarint32(bb, 330);
    var nested = popByteBuffer();
    _encodeUTMInfo($utm, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ForwardedNewsletterMessageInfo forwardedNewsletterMessageInfo = 43;
  var $forwardedNewsletterMessageInfo = message.forwardedNewsletterMessageInfo;
  if ($forwardedNewsletterMessageInfo !== undefined) {
    writeVarint32(bb, 346);
    var nested = popByteBuffer();
    _encodeForwardedNewsletterMessageInfo($forwardedNewsletterMessageInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional BusinessMessageForwardInfo businessMessageForwardInfo = 44;
  var $businessMessageForwardInfo = message.businessMessageForwardInfo;
  if ($businessMessageForwardInfo !== undefined) {
    writeVarint32(bb, 354);
    var nested = popByteBuffer();
    _encodeBusinessMessageForwardInfo($businessMessageForwardInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string smbClientCampaignId = 45;
  var $smbClientCampaignId = message.smbClientCampaignId;
  if ($smbClientCampaignId !== undefined) {
    writeVarint32(bb, 362);
    writeString(bb, $smbClientCampaignId);
  }

  // optional string smbServerCampaignId = 46;
  var $smbServerCampaignId = message.smbServerCampaignId;
  if ($smbServerCampaignId !== undefined) {
    writeVarint32(bb, 370);
    writeString(bb, $smbServerCampaignId);
  }

  // optional DataSharingContext dataSharingContext = 47;
  var $dataSharingContext = message.dataSharingContext;
  if ($dataSharingContext !== undefined) {
    writeVarint32(bb, 378);
    var nested = popByteBuffer();
    _encodeDataSharingContext($dataSharingContext, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool alwaysShowAdAttribution = 48;
  var $alwaysShowAdAttribution = message.alwaysShowAdAttribution;
  if ($alwaysShowAdAttribution !== undefined) {
    writeVarint32(bb, 384);
    writeByte(bb, $alwaysShowAdAttribution ? 1 : 0);
  }
};

exports.decodeContextInfo = function (binary) {
  return _decodeContextInfo(wrapByteBuffer(binary));
}

function _decodeContextInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string stanzaId = 1;
      case 1: {
        message.stanzaId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string participant = 2;
      case 2: {
        message.participant = readString(bb, readVarint32(bb));
        break;
      }

      // optional Message quotedMessage = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.quotedMessage = _decodeMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional string remoteJid = 4;
      case 4: {
        message.remoteJid = readString(bb, readVarint32(bb));
        break;
      }

      // repeated string mentionedJid = 15;
      case 15: {
        var values = message.mentionedJid || (message.mentionedJid = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional string conversionSource = 18;
      case 18: {
        message.conversionSource = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes conversionData = 19;
      case 19: {
        message.conversionData = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 conversionDelaySeconds = 20;
      case 20: {
        message.conversionDelaySeconds = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 forwardingScore = 21;
      case 21: {
        message.forwardingScore = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool isForwarded = 22;
      case 22: {
        message.isForwarded = !!readByte(bb);
        break;
      }

      // optional AdReplyInfo quotedAd = 23;
      case 23: {
        var limit = pushTemporaryLength(bb);
        message.quotedAd = _decodeAdReplyInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional MessageKey placeholderKey = 24;
      case 24: {
        var limit = pushTemporaryLength(bb);
        message.placeholderKey = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional uint32 expiration = 25;
      case 25: {
        message.expiration = readVarint32(bb) >>> 0;
        break;
      }

      // optional int64 ephemeralSettingTimestamp = 26;
      case 26: {
        message.ephemeralSettingTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bytes ephemeralSharedSecret = 27;
      case 27: {
        message.ephemeralSharedSecret = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional ExternalAdReplyInfo externalAdReply = 28;
      case 28: {
        var limit = pushTemporaryLength(bb);
        message.externalAdReply = _decodeExternalAdReplyInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional string entryPointConversionSource = 29;
      case 29: {
        message.entryPointConversionSource = readString(bb, readVarint32(bb));
        break;
      }

      // optional string entryPointConversionApp = 30;
      case 30: {
        message.entryPointConversionApp = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 entryPointConversionDelaySeconds = 31;
      case 31: {
        message.entryPointConversionDelaySeconds = readVarint32(bb) >>> 0;
        break;
      }

      // optional DisappearingMode disappearingMode = 32;
      case 32: {
        var limit = pushTemporaryLength(bb);
        message.disappearingMode = _decodeDisappearingMode(bb);
        bb.limit = limit;
        break;
      }

      // optional ActionLink actionLink = 33;
      case 33: {
        var limit = pushTemporaryLength(bb);
        message.actionLink = _decodeActionLink(bb);
        bb.limit = limit;
        break;
      }

      // optional string groupSubject = 34;
      case 34: {
        message.groupSubject = readString(bb, readVarint32(bb));
        break;
      }

      // optional string parentGroupJid = 35;
      case 35: {
        message.parentGroupJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string trustBannerType = 37;
      case 37: {
        message.trustBannerType = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 trustBannerAction = 38;
      case 38: {
        message.trustBannerAction = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool isSampled = 39;
      case 39: {
        message.isSampled = !!readByte(bb);
        break;
      }

      // repeated GroupMention groupMentions = 40;
      case 40: {
        var limit = pushTemporaryLength(bb);
        var values = message.groupMentions || (message.groupMentions = []);
        values.push(_decodeGroupMention(bb));
        bb.limit = limit;
        break;
      }

      // optional UTMInfo utm = 41;
      case 41: {
        var limit = pushTemporaryLength(bb);
        message.utm = _decodeUTMInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional ForwardedNewsletterMessageInfo forwardedNewsletterMessageInfo = 43;
      case 43: {
        var limit = pushTemporaryLength(bb);
        message.forwardedNewsletterMessageInfo = _decodeForwardedNewsletterMessageInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional BusinessMessageForwardInfo businessMessageForwardInfo = 44;
      case 44: {
        var limit = pushTemporaryLength(bb);
        message.businessMessageForwardInfo = _decodeBusinessMessageForwardInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional string smbClientCampaignId = 45;
      case 45: {
        message.smbClientCampaignId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string smbServerCampaignId = 46;
      case 46: {
        message.smbServerCampaignId = readString(bb, readVarint32(bb));
        break;
      }

      // optional DataSharingContext dataSharingContext = 47;
      case 47: {
        var limit = pushTemporaryLength(bb);
        message.dataSharingContext = _decodeDataSharingContext(bb);
        bb.limit = limit;
        break;
      }

      // optional bool alwaysShowAdAttribution = 48;
      case 48: {
        message.alwaysShowAdAttribution = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeConversation = function (message) {
  var bb = popByteBuffer();
  _encodeConversation(message, bb);
  return toUint8Array(bb);
}

function _encodeConversation(message, bb) {
  // required string id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }

  // repeated HistorySyncMsg messages = 2;
  var array$messages = message.messages;
  if (array$messages !== undefined) {
    for (var i = 0; i < array$messages.length; i++) {
      var value = array$messages[i];
      writeVarint32(bb, 18);
      var nested = popByteBuffer();
      _encodeHistorySyncMsg(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional string newJid = 3;
  var $newJid = message.newJid;
  if ($newJid !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $newJid);
  }

  // optional string oldJid = 4;
  var $oldJid = message.oldJid;
  if ($oldJid !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $oldJid);
  }

  // optional uint64 lastMsgTimestamp = 5;
  var $lastMsgTimestamp = message.lastMsgTimestamp;
  if ($lastMsgTimestamp !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $lastMsgTimestamp);
  }

  // optional uint32 unreadCount = 6;
  var $unreadCount = message.unreadCount;
  if ($unreadCount !== undefined) {
    writeVarint32(bb, 48);
    writeVarint32(bb, $unreadCount);
  }

  // optional bool readOnly = 7;
  var $readOnly = message.readOnly;
  if ($readOnly !== undefined) {
    writeVarint32(bb, 56);
    writeByte(bb, $readOnly ? 1 : 0);
  }

  // optional bool endOfHistoryTransfer = 8;
  var $endOfHistoryTransfer = message.endOfHistoryTransfer;
  if ($endOfHistoryTransfer !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $endOfHistoryTransfer ? 1 : 0);
  }

  // optional uint32 ephemeralExpiration = 9;
  var $ephemeralExpiration = message.ephemeralExpiration;
  if ($ephemeralExpiration !== undefined) {
    writeVarint32(bb, 72);
    writeVarint32(bb, $ephemeralExpiration);
  }

  // optional int64 ephemeralSettingTimestamp = 10;
  var $ephemeralSettingTimestamp = message.ephemeralSettingTimestamp;
  if ($ephemeralSettingTimestamp !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $ephemeralSettingTimestamp);
  }

  // optional EndOfHistoryTransferType endOfHistoryTransferType = 11;
  var $endOfHistoryTransferType = message.endOfHistoryTransferType;
  if ($endOfHistoryTransferType !== undefined) {
    writeVarint32(bb, 90);
    var nested = popByteBuffer();
    _encodeEndOfHistoryTransferType($endOfHistoryTransferType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 conversationTimestamp = 12;
  var $conversationTimestamp = message.conversationTimestamp;
  if ($conversationTimestamp !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, $conversationTimestamp);
  }

  // optional string name = 13;
  var $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $name);
  }

  // optional string pHash = 14;
  var $pHash = message.pHash;
  if ($pHash !== undefined) {
    writeVarint32(bb, 114);
    writeString(bb, $pHash);
  }

  // optional bool notSpam = 15;
  var $notSpam = message.notSpam;
  if ($notSpam !== undefined) {
    writeVarint32(bb, 120);
    writeByte(bb, $notSpam ? 1 : 0);
  }

  // optional bool archived = 16;
  var $archived = message.archived;
  if ($archived !== undefined) {
    writeVarint32(bb, 128);
    writeByte(bb, $archived ? 1 : 0);
  }

  // optional DisappearingMode disappearingMode = 17;
  var $disappearingMode = message.disappearingMode;
  if ($disappearingMode !== undefined) {
    writeVarint32(bb, 138);
    var nested = popByteBuffer();
    _encodeDisappearingMode($disappearingMode, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint32 unreadMentionCount = 18;
  var $unreadMentionCount = message.unreadMentionCount;
  if ($unreadMentionCount !== undefined) {
    writeVarint32(bb, 144);
    writeVarint32(bb, $unreadMentionCount);
  }

  // optional bool markedAsUnread = 19;
  var $markedAsUnread = message.markedAsUnread;
  if ($markedAsUnread !== undefined) {
    writeVarint32(bb, 152);
    writeByte(bb, $markedAsUnread ? 1 : 0);
  }

  // repeated GroupParticipant participant = 20;
  var array$participant = message.participant;
  if (array$participant !== undefined) {
    for (var i = 0; i < array$participant.length; i++) {
      var value = array$participant[i];
      writeVarint32(bb, 162);
      var nested = popByteBuffer();
      _encodeGroupParticipant(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional bytes tcToken = 21;
  var $tcToken = message.tcToken;
  if ($tcToken !== undefined) {
    writeVarint32(bb, 170);
    writeVarint32(bb, $tcToken.length), writeBytes(bb, $tcToken);
  }

  // optional uint64 tcTokenTimestamp = 22;
  var $tcTokenTimestamp = message.tcTokenTimestamp;
  if ($tcTokenTimestamp !== undefined) {
    writeVarint32(bb, 176);
    writeVarint64(bb, $tcTokenTimestamp);
  }

  // optional bytes contactPrimaryIdentityKey = 23;
  var $contactPrimaryIdentityKey = message.contactPrimaryIdentityKey;
  if ($contactPrimaryIdentityKey !== undefined) {
    writeVarint32(bb, 186);
    writeVarint32(bb, $contactPrimaryIdentityKey.length), writeBytes(bb, $contactPrimaryIdentityKey);
  }

  // optional uint32 pinned = 24;
  var $pinned = message.pinned;
  if ($pinned !== undefined) {
    writeVarint32(bb, 192);
    writeVarint32(bb, $pinned);
  }

  // optional uint64 muteEndTime = 25;
  var $muteEndTime = message.muteEndTime;
  if ($muteEndTime !== undefined) {
    writeVarint32(bb, 200);
    writeVarint64(bb, $muteEndTime);
  }

  // optional WallpaperSettings wallpaper = 26;
  var $wallpaper = message.wallpaper;
  if ($wallpaper !== undefined) {
    writeVarint32(bb, 210);
    var nested = popByteBuffer();
    _encodeWallpaperSettings($wallpaper, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MediaVisibility mediaVisibility = 27;
  var $mediaVisibility = message.mediaVisibility;
  if ($mediaVisibility !== undefined) {
    writeVarint32(bb, 216);
    writeVarint32(bb, exports.encodeMediaVisibility[$mediaVisibility]);
  }

  // optional uint64 tcTokenSenderTimestamp = 28;
  var $tcTokenSenderTimestamp = message.tcTokenSenderTimestamp;
  if ($tcTokenSenderTimestamp !== undefined) {
    writeVarint32(bb, 224);
    writeVarint64(bb, $tcTokenSenderTimestamp);
  }

  // optional bool suspended = 29;
  var $suspended = message.suspended;
  if ($suspended !== undefined) {
    writeVarint32(bb, 232);
    writeByte(bb, $suspended ? 1 : 0);
  }

  // optional bool terminated = 30;
  var $terminated = message.terminated;
  if ($terminated !== undefined) {
    writeVarint32(bb, 240);
    writeByte(bb, $terminated ? 1 : 0);
  }

  // optional uint64 createdAt = 31;
  var $createdAt = message.createdAt;
  if ($createdAt !== undefined) {
    writeVarint32(bb, 248);
    writeVarint64(bb, $createdAt);
  }

  // optional string createdBy = 32;
  var $createdBy = message.createdBy;
  if ($createdBy !== undefined) {
    writeVarint32(bb, 258);
    writeString(bb, $createdBy);
  }

  // optional string description = 33;
  var $description = message.description;
  if ($description !== undefined) {
    writeVarint32(bb, 266);
    writeString(bb, $description);
  }

  // optional bool support = 34;
  var $support = message.support;
  if ($support !== undefined) {
    writeVarint32(bb, 272);
    writeByte(bb, $support ? 1 : 0);
  }

  // optional bool isParentGroup = 35;
  var $isParentGroup = message.isParentGroup;
  if ($isParentGroup !== undefined) {
    writeVarint32(bb, 280);
    writeByte(bb, $isParentGroup ? 1 : 0);
  }

  // optional string parentGroupId = 37;
  var $parentGroupId = message.parentGroupId;
  if ($parentGroupId !== undefined) {
    writeVarint32(bb, 298);
    writeString(bb, $parentGroupId);
  }

  // optional bool isDefaultSubgroup = 36;
  var $isDefaultSubgroup = message.isDefaultSubgroup;
  if ($isDefaultSubgroup !== undefined) {
    writeVarint32(bb, 288);
    writeByte(bb, $isDefaultSubgroup ? 1 : 0);
  }

  // optional string displayName = 38;
  var $displayName = message.displayName;
  if ($displayName !== undefined) {
    writeVarint32(bb, 306);
    writeString(bb, $displayName);
  }

  // optional string pnJid = 39;
  var $pnJid = message.pnJid;
  if ($pnJid !== undefined) {
    writeVarint32(bb, 314);
    writeString(bb, $pnJid);
  }

  // optional bool shareOwnPn = 40;
  var $shareOwnPn = message.shareOwnPn;
  if ($shareOwnPn !== undefined) {
    writeVarint32(bb, 320);
    writeByte(bb, $shareOwnPn ? 1 : 0);
  }

  // optional bool pnhDuplicateLidThread = 41;
  var $pnhDuplicateLidThread = message.pnhDuplicateLidThread;
  if ($pnhDuplicateLidThread !== undefined) {
    writeVarint32(bb, 328);
    writeByte(bb, $pnhDuplicateLidThread ? 1 : 0);
  }

  // optional string lidJid = 42;
  var $lidJid = message.lidJid;
  if ($lidJid !== undefined) {
    writeVarint32(bb, 338);
    writeString(bb, $lidJid);
  }

  // optional string username = 43;
  var $username = message.username;
  if ($username !== undefined) {
    writeVarint32(bb, 346);
    writeString(bb, $username);
  }

  // optional string lidOriginType = 44;
  var $lidOriginType = message.lidOriginType;
  if ($lidOriginType !== undefined) {
    writeVarint32(bb, 354);
    writeString(bb, $lidOriginType);
  }

  // optional uint32 commentsCount = 45;
  var $commentsCount = message.commentsCount;
  if ($commentsCount !== undefined) {
    writeVarint32(bb, 360);
    writeVarint32(bb, $commentsCount);
  }

  // optional bool locked = 46;
  var $locked = message.locked;
  if ($locked !== undefined) {
    writeVarint32(bb, 368);
    writeByte(bb, $locked ? 1 : 0);
  }
};

exports.decodeConversation = function (binary) {
  return _decodeConversation(wrapByteBuffer(binary));
}

function _decodeConversation(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // repeated HistorySyncMsg messages = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        var values = message.messages || (message.messages = []);
        values.push(_decodeHistorySyncMsg(bb));
        bb.limit = limit;
        break;
      }

      // optional string newJid = 3;
      case 3: {
        message.newJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string oldJid = 4;
      case 4: {
        message.oldJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 lastMsgTimestamp = 5;
      case 5: {
        message.lastMsgTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint32 unreadCount = 6;
      case 6: {
        message.unreadCount = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool readOnly = 7;
      case 7: {
        message.readOnly = !!readByte(bb);
        break;
      }

      // optional bool endOfHistoryTransfer = 8;
      case 8: {
        message.endOfHistoryTransfer = !!readByte(bb);
        break;
      }

      // optional uint32 ephemeralExpiration = 9;
      case 9: {
        message.ephemeralExpiration = readVarint32(bb) >>> 0;
        break;
      }

      // optional int64 ephemeralSettingTimestamp = 10;
      case 10: {
        message.ephemeralSettingTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional EndOfHistoryTransferType endOfHistoryTransferType = 11;
      case 11: {
        var limit = pushTemporaryLength(bb);
        message.endOfHistoryTransferType = _decodeEndOfHistoryTransferType(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 conversationTimestamp = 12;
      case 12: {
        message.conversationTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string name = 13;
      case 13: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      // optional string pHash = 14;
      case 14: {
        message.pHash = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool notSpam = 15;
      case 15: {
        message.notSpam = !!readByte(bb);
        break;
      }

      // optional bool archived = 16;
      case 16: {
        message.archived = !!readByte(bb);
        break;
      }

      // optional DisappearingMode disappearingMode = 17;
      case 17: {
        var limit = pushTemporaryLength(bb);
        message.disappearingMode = _decodeDisappearingMode(bb);
        bb.limit = limit;
        break;
      }

      // optional uint32 unreadMentionCount = 18;
      case 18: {
        message.unreadMentionCount = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool markedAsUnread = 19;
      case 19: {
        message.markedAsUnread = !!readByte(bb);
        break;
      }

      // repeated GroupParticipant participant = 20;
      case 20: {
        var limit = pushTemporaryLength(bb);
        var values = message.participant || (message.participant = []);
        values.push(_decodeGroupParticipant(bb));
        bb.limit = limit;
        break;
      }

      // optional bytes tcToken = 21;
      case 21: {
        message.tcToken = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint64 tcTokenTimestamp = 22;
      case 22: {
        message.tcTokenTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bytes contactPrimaryIdentityKey = 23;
      case 23: {
        message.contactPrimaryIdentityKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 pinned = 24;
      case 24: {
        message.pinned = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint64 muteEndTime = 25;
      case 25: {
        message.muteEndTime = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional WallpaperSettings wallpaper = 26;
      case 26: {
        var limit = pushTemporaryLength(bb);
        message.wallpaper = _decodeWallpaperSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional MediaVisibility mediaVisibility = 27;
      case 27: {
        message.mediaVisibility = exports.decodeMediaVisibility[readVarint32(bb)];
        break;
      }

      // optional uint64 tcTokenSenderTimestamp = 28;
      case 28: {
        message.tcTokenSenderTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bool suspended = 29;
      case 29: {
        message.suspended = !!readByte(bb);
        break;
      }

      // optional bool terminated = 30;
      case 30: {
        message.terminated = !!readByte(bb);
        break;
      }

      // optional uint64 createdAt = 31;
      case 31: {
        message.createdAt = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string createdBy = 32;
      case 32: {
        message.createdBy = readString(bb, readVarint32(bb));
        break;
      }

      // optional string description = 33;
      case 33: {
        message.description = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool support = 34;
      case 34: {
        message.support = !!readByte(bb);
        break;
      }

      // optional bool isParentGroup = 35;
      case 35: {
        message.isParentGroup = !!readByte(bb);
        break;
      }

      // optional string parentGroupId = 37;
      case 37: {
        message.parentGroupId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool isDefaultSubgroup = 36;
      case 36: {
        message.isDefaultSubgroup = !!readByte(bb);
        break;
      }

      // optional string displayName = 38;
      case 38: {
        message.displayName = readString(bb, readVarint32(bb));
        break;
      }

      // optional string pnJid = 39;
      case 39: {
        message.pnJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool shareOwnPn = 40;
      case 40: {
        message.shareOwnPn = !!readByte(bb);
        break;
      }

      // optional bool pnhDuplicateLidThread = 41;
      case 41: {
        message.pnhDuplicateLidThread = !!readByte(bb);
        break;
      }

      // optional string lidJid = 42;
      case 42: {
        message.lidJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string username = 43;
      case 43: {
        message.username = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lidOriginType = 44;
      case 44: {
        message.lidOriginType = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 commentsCount = 45;
      case 45: {
        message.commentsCount = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool locked = 46;
      case 46: {
        message.locked = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.id === undefined)
    throw new Error("Missing required field: id");

  return message;
};

exports.encodeDeviceCapabilities = function (message) {
  var bb = popByteBuffer();
  _encodeDeviceCapabilities(message, bb);
  return toUint8Array(bb);
}

function _encodeDeviceCapabilities(message, bb) {
  // optional ChatLockSupportLevel chatLockSupportLevel = 1;
  var $chatLockSupportLevel = message.chatLockSupportLevel;
  if ($chatLockSupportLevel !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeChatLockSupportLevel($chatLockSupportLevel, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeDeviceCapabilities = function (binary) {
  return _decodeDeviceCapabilities(wrapByteBuffer(binary));
}

function _decodeDeviceCapabilities(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ChatLockSupportLevel chatLockSupportLevel = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.chatLockSupportLevel = _decodeChatLockSupportLevel(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeDeviceConsistencyCodeMessage = function (message) {
  var bb = popByteBuffer();
  _encodeDeviceConsistencyCodeMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeDeviceConsistencyCodeMessage(message, bb) {
  // optional uint32 generation = 1;
  var $generation = message.generation;
  if ($generation !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $generation);
  }

  // optional bytes signature = 2;
  var $signature = message.signature;
  if ($signature !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $signature.length), writeBytes(bb, $signature);
  }
};

exports.decodeDeviceConsistencyCodeMessage = function (binary) {
  return _decodeDeviceConsistencyCodeMessage(wrapByteBuffer(binary));
}

function _decodeDeviceConsistencyCodeMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 generation = 1;
      case 1: {
        message.generation = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes signature = 2;
      case 2: {
        message.signature = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeDeviceListMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeDeviceListMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeDeviceListMetadata(message, bb) {
  // optional bytes senderKeyHash = 1;
  var $senderKeyHash = message.senderKeyHash;
  if ($senderKeyHash !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $senderKeyHash.length), writeBytes(bb, $senderKeyHash);
  }

  // optional uint64 senderTimestamp = 2;
  var $senderTimestamp = message.senderTimestamp;
  if ($senderTimestamp !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $senderTimestamp);
  }

  // repeated uint32 senderKeyIndexes = 3;
  var array$senderKeyIndexes = message.senderKeyIndexes;
  if (array$senderKeyIndexes !== undefined) {
    var packed = popByteBuffer();
    for (var i = 0; i < array$senderKeyIndexes.length; i++) {
      var value = array$senderKeyIndexes[i];
      writeVarint32(packed, value);
    }
    writeVarint32(bb, 26);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }

  // optional ADVEncryptionType senderAccountType = 4;
  var $senderAccountType = message.senderAccountType;
  if ($senderAccountType !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, exports.encodeADVEncryptionType[$senderAccountType]);
  }

  // optional ADVEncryptionType receiverAccountType = 5;
  var $receiverAccountType = message.receiverAccountType;
  if ($receiverAccountType !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, exports.encodeADVEncryptionType[$receiverAccountType]);
  }

  // optional bytes recipientKeyHash = 8;
  var $recipientKeyHash = message.recipientKeyHash;
  if ($recipientKeyHash !== undefined) {
    writeVarint32(bb, 66);
    writeVarint32(bb, $recipientKeyHash.length), writeBytes(bb, $recipientKeyHash);
  }

  // optional uint64 recipientTimestamp = 9;
  var $recipientTimestamp = message.recipientTimestamp;
  if ($recipientTimestamp !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $recipientTimestamp);
  }

  // repeated uint32 recipientKeyIndexes = 10;
  var array$recipientKeyIndexes = message.recipientKeyIndexes;
  if (array$recipientKeyIndexes !== undefined) {
    var packed = popByteBuffer();
    for (var i = 0; i < array$recipientKeyIndexes.length; i++) {
      var value = array$recipientKeyIndexes[i];
      writeVarint32(packed, value);
    }
    writeVarint32(bb, 82);
    writeVarint32(bb, packed.offset);
    writeByteBuffer(bb, packed);
    pushByteBuffer(packed);
  }
};

exports.decodeDeviceListMetadata = function (binary) {
  return _decodeDeviceListMetadata(wrapByteBuffer(binary));
}

function _decodeDeviceListMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes senderKeyHash = 1;
      case 1: {
        message.senderKeyHash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint64 senderTimestamp = 2;
      case 2: {
        message.senderTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // repeated uint32 senderKeyIndexes = 3;
      case 3: {
        var values = message.senderKeyIndexes || (message.senderKeyIndexes = []);
        if ((tag & 7) === 2) {
          var outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb) >>> 0);
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb) >>> 0);
        }
        break;
      }

      // optional ADVEncryptionType senderAccountType = 4;
      case 4: {
        message.senderAccountType = exports.decodeADVEncryptionType[readVarint32(bb)];
        break;
      }

      // optional ADVEncryptionType receiverAccountType = 5;
      case 5: {
        message.receiverAccountType = exports.decodeADVEncryptionType[readVarint32(bb)];
        break;
      }

      // optional bytes recipientKeyHash = 8;
      case 8: {
        message.recipientKeyHash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint64 recipientTimestamp = 9;
      case 9: {
        message.recipientTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // repeated uint32 recipientKeyIndexes = 10;
      case 10: {
        var values = message.recipientKeyIndexes || (message.recipientKeyIndexes = []);
        if ((tag & 7) === 2) {
          var outerLimit = pushTemporaryLength(bb);
          while (!isAtEnd(bb)) {
            values.push(readVarint32(bb) >>> 0);
          }
          bb.limit = outerLimit;
        } else {
          values.push(readVarint32(bb) >>> 0);
        }
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeDeviceProps = function (message) {
  var bb = popByteBuffer();
  _encodeDeviceProps(message, bb);
  return toUint8Array(bb);
}

function _encodeDeviceProps(message, bb) {
  // optional string os = 1;
  var $os = message.os;
  if ($os !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $os);
  }

  // optional AppVersion version = 2;
  var $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeAppVersion($version, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PlatformType platformType = 3;
  var $platformType = message.platformType;
  if ($platformType !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodePlatformType($platformType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool requireFullSync = 4;
  var $requireFullSync = message.requireFullSync;
  if ($requireFullSync !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $requireFullSync ? 1 : 0);
  }

  // optional HistorySyncConfig historySyncConfig = 5;
  var $historySyncConfig = message.historySyncConfig;
  if ($historySyncConfig !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeHistorySyncConfig($historySyncConfig, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeDeviceProps = function (binary) {
  return _decodeDeviceProps(wrapByteBuffer(binary));
}

function _decodeDeviceProps(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string os = 1;
      case 1: {
        message.os = readString(bb, readVarint32(bb));
        break;
      }

      // optional AppVersion version = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.version = _decodeAppVersion(bb);
        bb.limit = limit;
        break;
      }

      // optional PlatformType platformType = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.platformType = _decodePlatformType(bb);
        bb.limit = limit;
        break;
      }

      // optional bool requireFullSync = 4;
      case 4: {
        message.requireFullSync = !!readByte(bb);
        break;
      }

      // optional HistorySyncConfig historySyncConfig = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.historySyncConfig = _decodeHistorySyncConfig(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeDisappearingMode = function (message) {
  var bb = popByteBuffer();
  _encodeDisappearingMode(message, bb);
  return toUint8Array(bb);
}

function _encodeDisappearingMode(message, bb) {
  // optional Initiator initiator = 1;
  var $initiator = message.initiator;
  if ($initiator !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeInitiator($initiator, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Trigger trigger = 2;
  var $trigger = message.trigger;
  if ($trigger !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeTrigger($trigger, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string initiatorDeviceJid = 3;
  var $initiatorDeviceJid = message.initiatorDeviceJid;
  if ($initiatorDeviceJid !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $initiatorDeviceJid);
  }

  // optional bool initiatedByMe = 4;
  var $initiatedByMe = message.initiatedByMe;
  if ($initiatedByMe !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $initiatedByMe ? 1 : 0);
  }
};

exports.decodeDisappearingMode = function (binary) {
  return _decodeDisappearingMode(wrapByteBuffer(binary));
}

function _decodeDisappearingMode(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Initiator initiator = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.initiator = _decodeInitiator(bb);
        bb.limit = limit;
        break;
      }

      // optional Trigger trigger = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.trigger = _decodeTrigger(bb);
        bb.limit = limit;
        break;
      }

      // optional string initiatorDeviceJid = 3;
      case 3: {
        message.initiatorDeviceJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool initiatedByMe = 4;
      case 4: {
        message.initiatedByMe = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeEphemeralSetting = function (message) {
  var bb = popByteBuffer();
  _encodeEphemeralSetting(message, bb);
  return toUint8Array(bb);
}

function _encodeEphemeralSetting(message, bb) {
  // optional sfixed32 duration = 1;
  var $duration = message.duration;
  if ($duration !== undefined) {
    writeVarint32(bb, 13);
    writeInt32(bb, $duration);
  }

  // optional sfixed64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 17);
    writeInt64(bb, $timestamp);
  }
};

exports.decodeEphemeralSetting = function (binary) {
  return _decodeEphemeralSetting(wrapByteBuffer(binary));
}

function _decodeEphemeralSetting(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional sfixed32 duration = 1;
      case 1: {
        message.duration = readInt32(bb);
        break;
      }

      // optional sfixed64 timestamp = 2;
      case 2: {
        message.timestamp = readInt64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeEventAdditionalMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeEventAdditionalMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeEventAdditionalMetadata(message, bb) {
  // optional bool isStale = 1;
  var $isStale = message.isStale;
  if ($isStale !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $isStale ? 1 : 0);
  }
};

exports.decodeEventAdditionalMetadata = function (binary) {
  return _decodeEventAdditionalMetadata(wrapByteBuffer(binary));
}

function _decodeEventAdditionalMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool isStale = 1;
      case 1: {
        message.isStale = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeEventResponse = function (message) {
  var bb = popByteBuffer();
  _encodeEventResponse(message, bb);
  return toUint8Array(bb);
}

function _encodeEventResponse(message, bb) {
  // optional MessageKey eventResponseMessageKey = 1;
  var $eventResponseMessageKey = message.eventResponseMessageKey;
  if ($eventResponseMessageKey !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeMessageKey($eventResponseMessageKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 timestampMs = 2;
  var $timestampMs = message.timestampMs;
  if ($timestampMs !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $timestampMs);
  }

  // optional Message.EventResponseMessage eventResponseMessage = 3;
  var $eventResponseMessage = message.eventResponseMessage;
  if ($eventResponseMessage !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeMessage.EventResponseMessage($eventResponseMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool unread = 4;
  var $unread = message.unread;
  if ($unread !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $unread ? 1 : 0);
  }
};

exports.decodeEventResponse = function (binary) {
  return _decodeEventResponse(wrapByteBuffer(binary));
}

function _decodeEventResponse(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional MessageKey eventResponseMessageKey = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.eventResponseMessageKey = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional int64 timestampMs = 2;
      case 2: {
        message.timestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional Message.EventResponseMessage eventResponseMessage = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.eventResponseMessage = _decodeMessage.EventResponseMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional bool unread = 4;
      case 4: {
        message.unread = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeExitCode = function (message) {
  var bb = popByteBuffer();
  _encodeExitCode(message, bb);
  return toUint8Array(bb);
}

function _encodeExitCode(message, bb) {
  // optional uint64 code = 1;
  var $code = message.code;
  if ($code !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $code);
  }

  // optional string text = 2;
  var $text = message.text;
  if ($text !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $text);
  }
};

exports.decodeExitCode = function (binary) {
  return _decodeExitCode(wrapByteBuffer(binary));
}

function _decodeExitCode(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 code = 1;
      case 1: {
        message.code = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string text = 2;
      case 2: {
        message.text = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeExternalBlobReference = function (message) {
  var bb = popByteBuffer();
  _encodeExternalBlobReference(message, bb);
  return toUint8Array(bb);
}

function _encodeExternalBlobReference(message, bb) {
  // optional bytes mediaKey = 1;
  var $mediaKey = message.mediaKey;
  if ($mediaKey !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $mediaKey.length), writeBytes(bb, $mediaKey);
  }

  // optional string directPath = 2;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $directPath);
  }

  // optional string handle = 3;
  var $handle = message.handle;
  if ($handle !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $handle);
  }

  // optional uint64 fileSizeBytes = 4;
  var $fileSizeBytes = message.fileSizeBytes;
  if ($fileSizeBytes !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $fileSizeBytes);
  }

  // optional bytes fileSha256 = 5;
  var $fileSha256 = message.fileSha256;
  if ($fileSha256 !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $fileSha256.length), writeBytes(bb, $fileSha256);
  }

  // optional bytes fileEncSha256 = 6;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $fileEncSha256.length), writeBytes(bb, $fileEncSha256);
  }
};

exports.decodeExternalBlobReference = function (binary) {
  return _decodeExternalBlobReference(wrapByteBuffer(binary));
}

function _decodeExternalBlobReference(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes mediaKey = 1;
      case 1: {
        message.mediaKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string directPath = 2;
      case 2: {
        message.directPath = readString(bb, readVarint32(bb));
        break;
      }

      // optional string handle = 3;
      case 3: {
        message.handle = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 fileSizeBytes = 4;
      case 4: {
        message.fileSizeBytes = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bytes fileSha256 = 5;
      case 5: {
        message.fileSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes fileEncSha256 = 6;
      case 6: {
        message.fileEncSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeGlobalSettings = function (message) {
  var bb = popByteBuffer();
  _encodeGlobalSettings(message, bb);
  return toUint8Array(bb);
}

function _encodeGlobalSettings(message, bb) {
  // optional WallpaperSettings lightThemeWallpaper = 1;
  var $lightThemeWallpaper = message.lightThemeWallpaper;
  if ($lightThemeWallpaper !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeWallpaperSettings($lightThemeWallpaper, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MediaVisibility mediaVisibility = 2;
  var $mediaVisibility = message.mediaVisibility;
  if ($mediaVisibility !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, exports.encodeMediaVisibility[$mediaVisibility]);
  }

  // optional WallpaperSettings darkThemeWallpaper = 3;
  var $darkThemeWallpaper = message.darkThemeWallpaper;
  if ($darkThemeWallpaper !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeWallpaperSettings($darkThemeWallpaper, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AutoDownloadSettings autoDownloadWiFi = 4;
  var $autoDownloadWiFi = message.autoDownloadWiFi;
  if ($autoDownloadWiFi !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeAutoDownloadSettings($autoDownloadWiFi, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AutoDownloadSettings autoDownloadCellular = 5;
  var $autoDownloadCellular = message.autoDownloadCellular;
  if ($autoDownloadCellular !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeAutoDownloadSettings($autoDownloadCellular, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AutoDownloadSettings autoDownloadRoaming = 6;
  var $autoDownloadRoaming = message.autoDownloadRoaming;
  if ($autoDownloadRoaming !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeAutoDownloadSettings($autoDownloadRoaming, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool showIndividualNotificationsPreview = 7;
  var $showIndividualNotificationsPreview = message.showIndividualNotificationsPreview;
  if ($showIndividualNotificationsPreview !== undefined) {
    writeVarint32(bb, 56);
    writeByte(bb, $showIndividualNotificationsPreview ? 1 : 0);
  }

  // optional bool showGroupNotificationsPreview = 8;
  var $showGroupNotificationsPreview = message.showGroupNotificationsPreview;
  if ($showGroupNotificationsPreview !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $showGroupNotificationsPreview ? 1 : 0);
  }

  // optional int32 disappearingModeDuration = 9;
  var $disappearingModeDuration = message.disappearingModeDuration;
  if ($disappearingModeDuration !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($disappearingModeDuration));
  }

  // optional int64 disappearingModeTimestamp = 10;
  var $disappearingModeTimestamp = message.disappearingModeTimestamp;
  if ($disappearingModeTimestamp !== undefined) {
    writeVarint32(bb, 80);
    writeVarint64(bb, $disappearingModeTimestamp);
  }

  // optional AvatarUserSettings avatarUserSettings = 11;
  var $avatarUserSettings = message.avatarUserSettings;
  if ($avatarUserSettings !== undefined) {
    writeVarint32(bb, 90);
    var nested = popByteBuffer();
    _encodeAvatarUserSettings($avatarUserSettings, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int32 fontSize = 12;
  var $fontSize = message.fontSize;
  if ($fontSize !== undefined) {
    writeVarint32(bb, 96);
    writeVarint64(bb, intToLong($fontSize));
  }

  // optional bool securityNotifications = 13;
  var $securityNotifications = message.securityNotifications;
  if ($securityNotifications !== undefined) {
    writeVarint32(bb, 104);
    writeByte(bb, $securityNotifications ? 1 : 0);
  }

  // optional bool autoUnarchiveChats = 14;
  var $autoUnarchiveChats = message.autoUnarchiveChats;
  if ($autoUnarchiveChats !== undefined) {
    writeVarint32(bb, 112);
    writeByte(bb, $autoUnarchiveChats ? 1 : 0);
  }

  // optional int32 videoQualityMode = 15;
  var $videoQualityMode = message.videoQualityMode;
  if ($videoQualityMode !== undefined) {
    writeVarint32(bb, 120);
    writeVarint64(bb, intToLong($videoQualityMode));
  }

  // optional int32 photoQualityMode = 16;
  var $photoQualityMode = message.photoQualityMode;
  if ($photoQualityMode !== undefined) {
    writeVarint32(bb, 128);
    writeVarint64(bb, intToLong($photoQualityMode));
  }

  // optional NotificationSettings individualNotificationSettings = 17;
  var $individualNotificationSettings = message.individualNotificationSettings;
  if ($individualNotificationSettings !== undefined) {
    writeVarint32(bb, 138);
    var nested = popByteBuffer();
    _encodeNotificationSettings($individualNotificationSettings, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional NotificationSettings groupNotificationSettings = 18;
  var $groupNotificationSettings = message.groupNotificationSettings;
  if ($groupNotificationSettings !== undefined) {
    writeVarint32(bb, 146);
    var nested = popByteBuffer();
    _encodeNotificationSettings($groupNotificationSettings, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ChatLockSettings chatLockSettings = 19;
  var $chatLockSettings = message.chatLockSettings;
  if ($chatLockSettings !== undefined) {
    writeVarint32(bb, 154);
    var nested = popByteBuffer();
    _encodeChatLockSettings($chatLockSettings, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeGlobalSettings = function (binary) {
  return _decodeGlobalSettings(wrapByteBuffer(binary));
}

function _decodeGlobalSettings(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional WallpaperSettings lightThemeWallpaper = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.lightThemeWallpaper = _decodeWallpaperSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional MediaVisibility mediaVisibility = 2;
      case 2: {
        message.mediaVisibility = exports.decodeMediaVisibility[readVarint32(bb)];
        break;
      }

      // optional WallpaperSettings darkThemeWallpaper = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.darkThemeWallpaper = _decodeWallpaperSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional AutoDownloadSettings autoDownloadWiFi = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.autoDownloadWiFi = _decodeAutoDownloadSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional AutoDownloadSettings autoDownloadCellular = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.autoDownloadCellular = _decodeAutoDownloadSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional AutoDownloadSettings autoDownloadRoaming = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.autoDownloadRoaming = _decodeAutoDownloadSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional bool showIndividualNotificationsPreview = 7;
      case 7: {
        message.showIndividualNotificationsPreview = !!readByte(bb);
        break;
      }

      // optional bool showGroupNotificationsPreview = 8;
      case 8: {
        message.showGroupNotificationsPreview = !!readByte(bb);
        break;
      }

      // optional int32 disappearingModeDuration = 9;
      case 9: {
        message.disappearingModeDuration = readVarint32(bb);
        break;
      }

      // optional int64 disappearingModeTimestamp = 10;
      case 10: {
        message.disappearingModeTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional AvatarUserSettings avatarUserSettings = 11;
      case 11: {
        var limit = pushTemporaryLength(bb);
        message.avatarUserSettings = _decodeAvatarUserSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 fontSize = 12;
      case 12: {
        message.fontSize = readVarint32(bb);
        break;
      }

      // optional bool securityNotifications = 13;
      case 13: {
        message.securityNotifications = !!readByte(bb);
        break;
      }

      // optional bool autoUnarchiveChats = 14;
      case 14: {
        message.autoUnarchiveChats = !!readByte(bb);
        break;
      }

      // optional int32 videoQualityMode = 15;
      case 15: {
        message.videoQualityMode = readVarint32(bb);
        break;
      }

      // optional int32 photoQualityMode = 16;
      case 16: {
        message.photoQualityMode = readVarint32(bb);
        break;
      }

      // optional NotificationSettings individualNotificationSettings = 17;
      case 17: {
        var limit = pushTemporaryLength(bb);
        message.individualNotificationSettings = _decodeNotificationSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional NotificationSettings groupNotificationSettings = 18;
      case 18: {
        var limit = pushTemporaryLength(bb);
        message.groupNotificationSettings = _decodeNotificationSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional ChatLockSettings chatLockSettings = 19;
      case 19: {
        var limit = pushTemporaryLength(bb);
        message.chatLockSettings = _decodeChatLockSettings(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeGroupMention = function (message) {
  var bb = popByteBuffer();
  _encodeGroupMention(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupMention(message, bb) {
  // optional string groupJid = 1;
  var $groupJid = message.groupJid;
  if ($groupJid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $groupJid);
  }

  // optional string groupSubject = 2;
  var $groupSubject = message.groupSubject;
  if ($groupSubject !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $groupSubject);
  }
};

exports.decodeGroupMention = function (binary) {
  return _decodeGroupMention(wrapByteBuffer(binary));
}

function _decodeGroupMention(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string groupJid = 1;
      case 1: {
        message.groupJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string groupSubject = 2;
      case 2: {
        message.groupSubject = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeGroupParticipant = function (message) {
  var bb = popByteBuffer();
  _encodeGroupParticipant(message, bb);
  return toUint8Array(bb);
}

function _encodeGroupParticipant(message, bb) {
  // required string userJid = 1;
  var $userJid = message.userJid;
  if ($userJid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $userJid);
  }

  // optional Rank rank = 2;
  var $rank = message.rank;
  if ($rank !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeRank($rank, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeGroupParticipant = function (binary) {
  return _decodeGroupParticipant(wrapByteBuffer(binary));
}

function _decodeGroupParticipant(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string userJid = 1;
      case 1: {
        message.userJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional Rank rank = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.rank = _decodeRank(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.userJid === undefined)
    throw new Error("Missing required field: userJid");

  return message;
};

exports.encodeHandshakeMessage = function (message) {
  var bb = popByteBuffer();
  _encodeHandshakeMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeHandshakeMessage(message, bb) {
  // optional ClientHello clientHello = 2;
  var $clientHello = message.clientHello;
  if ($clientHello !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeClientHello($clientHello, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ServerHello serverHello = 3;
  var $serverHello = message.serverHello;
  if ($serverHello !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeServerHello($serverHello, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ClientFinish clientFinish = 4;
  var $clientFinish = message.clientFinish;
  if ($clientFinish !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeClientFinish($clientFinish, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeHandshakeMessage = function (binary) {
  return _decodeHandshakeMessage(wrapByteBuffer(binary));
}

function _decodeHandshakeMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional ClientHello clientHello = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.clientHello = _decodeClientHello(bb);
        bb.limit = limit;
        break;
      }

      // optional ServerHello serverHello = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.serverHello = _decodeServerHello(bb);
        bb.limit = limit;
        break;
      }

      // optional ClientFinish clientFinish = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.clientFinish = _decodeClientFinish(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeHistorySync = function (message) {
  var bb = popByteBuffer();
  _encodeHistorySync(message, bb);
  return toUint8Array(bb);
}

function _encodeHistorySync(message, bb) {
  // required HistorySyncType syncType = 1;
  var $syncType = message.syncType;
  if ($syncType !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeHistorySyncType($syncType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated Conversation conversations = 2;
  var array$conversations = message.conversations;
  if (array$conversations !== undefined) {
    for (var i = 0; i < array$conversations.length; i++) {
      var value = array$conversations[i];
      writeVarint32(bb, 18);
      var nested = popByteBuffer();
      _encodeConversation(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated WebMessageInfo statusV3Messages = 3;
  var array$statusV3Messages = message.statusV3Messages;
  if (array$statusV3Messages !== undefined) {
    for (var i = 0; i < array$statusV3Messages.length; i++) {
      var value = array$statusV3Messages[i];
      writeVarint32(bb, 26);
      var nested = popByteBuffer();
      _encodeWebMessageInfo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional uint32 chunkOrder = 5;
  var $chunkOrder = message.chunkOrder;
  if ($chunkOrder !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, $chunkOrder);
  }

  // optional uint32 progress = 6;
  var $progress = message.progress;
  if ($progress !== undefined) {
    writeVarint32(bb, 48);
    writeVarint32(bb, $progress);
  }

  // repeated Pushname pushnames = 7;
  var array$pushnames = message.pushnames;
  if (array$pushnames !== undefined) {
    for (var i = 0; i < array$pushnames.length; i++) {
      var value = array$pushnames[i];
      writeVarint32(bb, 58);
      var nested = popByteBuffer();
      _encodePushname(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional GlobalSettings globalSettings = 8;
  var $globalSettings = message.globalSettings;
  if ($globalSettings !== undefined) {
    writeVarint32(bb, 66);
    var nested = popByteBuffer();
    _encodeGlobalSettings($globalSettings, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes threadIdUserSecret = 9;
  var $threadIdUserSecret = message.threadIdUserSecret;
  if ($threadIdUserSecret !== undefined) {
    writeVarint32(bb, 74);
    writeVarint32(bb, $threadIdUserSecret.length), writeBytes(bb, $threadIdUserSecret);
  }

  // optional uint32 threadDsTimeframeOffset = 10;
  var $threadDsTimeframeOffset = message.threadDsTimeframeOffset;
  if ($threadDsTimeframeOffset !== undefined) {
    writeVarint32(bb, 80);
    writeVarint32(bb, $threadDsTimeframeOffset);
  }

  // repeated StickerMetadata recentStickers = 11;
  var array$recentStickers = message.recentStickers;
  if (array$recentStickers !== undefined) {
    for (var i = 0; i < array$recentStickers.length; i++) {
      var value = array$recentStickers[i];
      writeVarint32(bb, 90);
      var nested = popByteBuffer();
      _encodeStickerMetadata(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated PastParticipants pastParticipants = 12;
  var array$pastParticipants = message.pastParticipants;
  if (array$pastParticipants !== undefined) {
    for (var i = 0; i < array$pastParticipants.length; i++) {
      var value = array$pastParticipants[i];
      writeVarint32(bb, 98);
      var nested = popByteBuffer();
      _encodePastParticipants(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated CallLogRecord callLogRecords = 13;
  var array$callLogRecords = message.callLogRecords;
  if (array$callLogRecords !== undefined) {
    for (var i = 0; i < array$callLogRecords.length; i++) {
      var value = array$callLogRecords[i];
      writeVarint32(bb, 106);
      var nested = popByteBuffer();
      _encodeCallLogRecord(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional BotAIWaitListState aiWaitListState = 14;
  var $aiWaitListState = message.aiWaitListState;
  if ($aiWaitListState !== undefined) {
    writeVarint32(bb, 114);
    var nested = popByteBuffer();
    _encodeBotAIWaitListState($aiWaitListState, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PhoneNumberToLIDMapping phoneNumberToLidMappings = 15;
  var array$phoneNumberToLidMappings = message.phoneNumberToLidMappings;
  if (array$phoneNumberToLidMappings !== undefined) {
    for (var i = 0; i < array$phoneNumberToLidMappings.length; i++) {
      var value = array$phoneNumberToLidMappings[i];
      writeVarint32(bb, 122);
      var nested = popByteBuffer();
      _encodePhoneNumberToLIDMapping(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodeHistorySync = function (binary) {
  return _decodeHistorySync(wrapByteBuffer(binary));
}

function _decodeHistorySync(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required HistorySyncType syncType = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.syncType = _decodeHistorySyncType(bb);
        bb.limit = limit;
        break;
      }

      // repeated Conversation conversations = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        var values = message.conversations || (message.conversations = []);
        values.push(_decodeConversation(bb));
        bb.limit = limit;
        break;
      }

      // repeated WebMessageInfo statusV3Messages = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        var values = message.statusV3Messages || (message.statusV3Messages = []);
        values.push(_decodeWebMessageInfo(bb));
        bb.limit = limit;
        break;
      }

      // optional uint32 chunkOrder = 5;
      case 5: {
        message.chunkOrder = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 progress = 6;
      case 6: {
        message.progress = readVarint32(bb) >>> 0;
        break;
      }

      // repeated Pushname pushnames = 7;
      case 7: {
        var limit = pushTemporaryLength(bb);
        var values = message.pushnames || (message.pushnames = []);
        values.push(_decodePushname(bb));
        bb.limit = limit;
        break;
      }

      // optional GlobalSettings globalSettings = 8;
      case 8: {
        var limit = pushTemporaryLength(bb);
        message.globalSettings = _decodeGlobalSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes threadIdUserSecret = 9;
      case 9: {
        message.threadIdUserSecret = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 threadDsTimeframeOffset = 10;
      case 10: {
        message.threadDsTimeframeOffset = readVarint32(bb) >>> 0;
        break;
      }

      // repeated StickerMetadata recentStickers = 11;
      case 11: {
        var limit = pushTemporaryLength(bb);
        var values = message.recentStickers || (message.recentStickers = []);
        values.push(_decodeStickerMetadata(bb));
        bb.limit = limit;
        break;
      }

      // repeated PastParticipants pastParticipants = 12;
      case 12: {
        var limit = pushTemporaryLength(bb);
        var values = message.pastParticipants || (message.pastParticipants = []);
        values.push(_decodePastParticipants(bb));
        bb.limit = limit;
        break;
      }

      // repeated CallLogRecord callLogRecords = 13;
      case 13: {
        var limit = pushTemporaryLength(bb);
        var values = message.callLogRecords || (message.callLogRecords = []);
        values.push(_decodeCallLogRecord(bb));
        bb.limit = limit;
        break;
      }

      // optional BotAIWaitListState aiWaitListState = 14;
      case 14: {
        var limit = pushTemporaryLength(bb);
        message.aiWaitListState = _decodeBotAIWaitListState(bb);
        bb.limit = limit;
        break;
      }

      // repeated PhoneNumberToLIDMapping phoneNumberToLidMappings = 15;
      case 15: {
        var limit = pushTemporaryLength(bb);
        var values = message.phoneNumberToLidMappings || (message.phoneNumberToLidMappings = []);
        values.push(_decodePhoneNumberToLIDMapping(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.syncType === undefined)
    throw new Error("Missing required field: syncType");

  return message;
};

exports.encodeHistorySyncMsg = function (message) {
  var bb = popByteBuffer();
  _encodeHistorySyncMsg(message, bb);
  return toUint8Array(bb);
}

function _encodeHistorySyncMsg(message, bb) {
  // optional WebMessageInfo message = 1;
  var $message = message.message;
  if ($message !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeWebMessageInfo($message, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 msgOrderId = 2;
  var $msgOrderId = message.msgOrderId;
  if ($msgOrderId !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $msgOrderId);
  }
};

exports.decodeHistorySyncMsg = function (binary) {
  return _decodeHistorySyncMsg(wrapByteBuffer(binary));
}

function _decodeHistorySyncMsg(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional WebMessageInfo message = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.message = _decodeWebMessageInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 msgOrderId = 2;
      case 2: {
        message.msgOrderId = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeHydratedTemplateButton = function (message) {
  var bb = popByteBuffer();
  _encodeHydratedTemplateButton(message, bb);
  return toUint8Array(bb);
}

function _encodeHydratedTemplateButton(message, bb) {
  // optional uint32 index = 4;
  var $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, $index);
  }

  // optional HydratedTemplateButton.HydratedQuickReplyButton quickReplyButton = 1;
  var $quickReplyButton = message.quickReplyButton;
  if ($quickReplyButton !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeHydratedTemplateButton.HydratedQuickReplyButton($quickReplyButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional HydratedTemplateButton.HydratedURLButton urlButton = 2;
  var $urlButton = message.urlButton;
  if ($urlButton !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeHydratedTemplateButton.HydratedURLButton($urlButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional HydratedTemplateButton.HydratedCallButton callButton = 3;
  var $callButton = message.callButton;
  if ($callButton !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeHydratedTemplateButton.HydratedCallButton($callButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeHydratedTemplateButton = function (binary) {
  return _decodeHydratedTemplateButton(wrapByteBuffer(binary));
}

function _decodeHydratedTemplateButton(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 index = 4;
      case 4: {
        message.index = readVarint32(bb) >>> 0;
        break;
      }

      // optional HydratedTemplateButton.HydratedQuickReplyButton quickReplyButton = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.quickReplyButton = _decodeHydratedTemplateButton.HydratedQuickReplyButton(bb);
        bb.limit = limit;
        break;
      }

      // optional HydratedTemplateButton.HydratedURLButton urlButton = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.urlButton = _decodeHydratedTemplateButton.HydratedURLButton(bb);
        bb.limit = limit;
        break;
      }

      // optional HydratedTemplateButton.HydratedCallButton callButton = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.callButton = _decodeHydratedTemplateButton.HydratedCallButton(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeIdentityKeyPairStructure = function (message) {
  var bb = popByteBuffer();
  _encodeIdentityKeyPairStructure(message, bb);
  return toUint8Array(bb);
}

function _encodeIdentityKeyPairStructure(message, bb) {
  // optional bytes publicKey = 1;
  var $publicKey = message.publicKey;
  if ($publicKey !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $publicKey.length), writeBytes(bb, $publicKey);
  }

  // optional bytes privateKey = 2;
  var $privateKey = message.privateKey;
  if ($privateKey !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $privateKey.length), writeBytes(bb, $privateKey);
  }
};

exports.decodeIdentityKeyPairStructure = function (binary) {
  return _decodeIdentityKeyPairStructure(wrapByteBuffer(binary));
}

function _decodeIdentityKeyPairStructure(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes publicKey = 1;
      case 1: {
        message.publicKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes privateKey = 2;
      case 2: {
        message.privateKey = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeInteractiveAnnotation = function (message) {
  var bb = popByteBuffer();
  _encodeInteractiveAnnotation(message, bb);
  return toUint8Array(bb);
}

function _encodeInteractiveAnnotation(message, bb) {
  // repeated Point polygonVertices = 1;
  var array$polygonVertices = message.polygonVertices;
  if (array$polygonVertices !== undefined) {
    for (var i = 0; i < array$polygonVertices.length; i++) {
      var value = array$polygonVertices[i];
      writeVarint32(bb, 10);
      var nested = popByteBuffer();
      _encodePoint(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional bool shouldSkipConfirmation = 4;
  var $shouldSkipConfirmation = message.shouldSkipConfirmation;
  if ($shouldSkipConfirmation !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $shouldSkipConfirmation ? 1 : 0);
  }

  // optional Location location = 2;
  var $location = message.location;
  if ($location !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeLocation($location, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ContextInfo.ForwardedNewsletterMessageInfo newsletter = 3;
  var $newsletter = message.newsletter;
  if ($newsletter !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeContextInfo.ForwardedNewsletterMessageInfo($newsletter, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeInteractiveAnnotation = function (binary) {
  return _decodeInteractiveAnnotation(wrapByteBuffer(binary));
}

function _decodeInteractiveAnnotation(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated Point polygonVertices = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        var values = message.polygonVertices || (message.polygonVertices = []);
        values.push(_decodePoint(bb));
        bb.limit = limit;
        break;
      }

      // optional bool shouldSkipConfirmation = 4;
      case 4: {
        message.shouldSkipConfirmation = !!readByte(bb);
        break;
      }

      // optional Location location = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.location = _decodeLocation(bb);
        bb.limit = limit;
        break;
      }

      // optional ContextInfo.ForwardedNewsletterMessageInfo newsletter = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.newsletter = _decodeContextInfo.ForwardedNewsletterMessageInfo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeKeepInChat = function (message) {
  var bb = popByteBuffer();
  _encodeKeepInChat(message, bb);
  return toUint8Array(bb);
}

function _encodeKeepInChat(message, bb) {
  // optional KeepType keepType = 1;
  var $keepType = message.keepType;
  if ($keepType !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, exports.encodeKeepType[$keepType]);
  }

  // optional int64 serverTimestamp = 2;
  var $serverTimestamp = message.serverTimestamp;
  if ($serverTimestamp !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $serverTimestamp);
  }

  // optional MessageKey key = 3;
  var $key = message.key;
  if ($key !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeMessageKey($key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string deviceJid = 4;
  var $deviceJid = message.deviceJid;
  if ($deviceJid !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $deviceJid);
  }

  // optional int64 clientTimestampMs = 5;
  var $clientTimestampMs = message.clientTimestampMs;
  if ($clientTimestampMs !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $clientTimestampMs);
  }

  // optional int64 serverTimestampMs = 6;
  var $serverTimestampMs = message.serverTimestampMs;
  if ($serverTimestampMs !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $serverTimestampMs);
  }
};

exports.decodeKeepInChat = function (binary) {
  return _decodeKeepInChat(wrapByteBuffer(binary));
}

function _decodeKeepInChat(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional KeepType keepType = 1;
      case 1: {
        message.keepType = exports.decodeKeepType[readVarint32(bb)];
        break;
      }

      // optional int64 serverTimestamp = 2;
      case 2: {
        message.serverTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional MessageKey key = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.key = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional string deviceJid = 4;
      case 4: {
        message.deviceJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 clientTimestampMs = 5;
      case 5: {
        message.clientTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 serverTimestampMs = 6;
      case 6: {
        message.serverTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeKeyExchangeMessage = function (message) {
  var bb = popByteBuffer();
  _encodeKeyExchangeMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeKeyExchangeMessage(message, bb) {
  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional bytes baseKey = 2;
  var $baseKey = message.baseKey;
  if ($baseKey !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $baseKey.length), writeBytes(bb, $baseKey);
  }

  // optional bytes ratchetKey = 3;
  var $ratchetKey = message.ratchetKey;
  if ($ratchetKey !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $ratchetKey.length), writeBytes(bb, $ratchetKey);
  }

  // optional bytes identityKey = 4;
  var $identityKey = message.identityKey;
  if ($identityKey !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $identityKey.length), writeBytes(bb, $identityKey);
  }

  // optional bytes baseKeySignature = 5;
  var $baseKeySignature = message.baseKeySignature;
  if ($baseKeySignature !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $baseKeySignature.length), writeBytes(bb, $baseKeySignature);
  }
};

exports.decodeKeyExchangeMessage = function (binary) {
  return _decodeKeyExchangeMessage(wrapByteBuffer(binary));
}

function _decodeKeyExchangeMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes baseKey = 2;
      case 2: {
        message.baseKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes ratchetKey = 3;
      case 3: {
        message.ratchetKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes identityKey = 4;
      case 4: {
        message.identityKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes baseKeySignature = 5;
      case 5: {
        message.baseKeySignature = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeKeyId = function (message) {
  var bb = popByteBuffer();
  _encodeKeyId(message, bb);
  return toUint8Array(bb);
}

function _encodeKeyId(message, bb) {
  // optional bytes id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $id.length), writeBytes(bb, $id);
  }
};

exports.decodeKeyId = function (binary) {
  return _decodeKeyId(wrapByteBuffer(binary));
}

function _decodeKeyId(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes id = 1;
      case 1: {
        message.id = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeLocalizedName = function (message) {
  var bb = popByteBuffer();
  _encodeLocalizedName(message, bb);
  return toUint8Array(bb);
}

function _encodeLocalizedName(message, bb) {
  // optional string lg = 1;
  var $lg = message.lg;
  if ($lg !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $lg);
  }

  // optional string lc = 2;
  var $lc = message.lc;
  if ($lc !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lc);
  }

  // optional string verifiedName = 3;
  var $verifiedName = message.verifiedName;
  if ($verifiedName !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $verifiedName);
  }
};

exports.decodeLocalizedName = function (binary) {
  return _decodeLocalizedName(wrapByteBuffer(binary));
}

function _decodeLocalizedName(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string lg = 1;
      case 1: {
        message.lg = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lc = 2;
      case 2: {
        message.lc = readString(bb, readVarint32(bb));
        break;
      }

      // optional string verifiedName = 3;
      case 3: {
        message.verifiedName = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeLocation = function (message) {
  var bb = popByteBuffer();
  _encodeLocation(message, bb);
  return toUint8Array(bb);
}

function _encodeLocation(message, bb) {
  // optional double degreesLatitude = 1;
  var $degreesLatitude = message.degreesLatitude;
  if ($degreesLatitude !== undefined) {
    writeVarint32(bb, 9);
    writeDouble(bb, $degreesLatitude);
  }

  // optional double degreesLongitude = 2;
  var $degreesLongitude = message.degreesLongitude;
  if ($degreesLongitude !== undefined) {
    writeVarint32(bb, 17);
    writeDouble(bb, $degreesLongitude);
  }

  // optional string name = 3;
  var $name = message.name;
  if ($name !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $name);
  }
};

exports.decodeLocation = function (binary) {
  return _decodeLocation(wrapByteBuffer(binary));
}

function _decodeLocation(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional double degreesLatitude = 1;
      case 1: {
        message.degreesLatitude = readDouble(bb);
        break;
      }

      // optional double degreesLongitude = 2;
      case 2: {
        message.degreesLongitude = readDouble(bb);
        break;
      }

      // optional string name = 3;
      case 3: {
        message.name = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMediaData = function (message) {
  var bb = popByteBuffer();
  _encodeMediaData(message, bb);
  return toUint8Array(bb);
}

function _encodeMediaData(message, bb) {
  // optional string localPath = 1;
  var $localPath = message.localPath;
  if ($localPath !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $localPath);
  }
};

exports.decodeMediaData = function (binary) {
  return _decodeMediaData(wrapByteBuffer(binary));
}

function _decodeMediaData(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string localPath = 1;
      case 1: {
        message.localPath = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMediaEntry = function (message) {
  var bb = popByteBuffer();
  _encodeMediaEntry(message, bb);
  return toUint8Array(bb);
}

function _encodeMediaEntry(message, bb) {
  // optional bytes fileSha256 = 1;
  var $fileSha256 = message.fileSha256;
  if ($fileSha256 !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $fileSha256.length), writeBytes(bb, $fileSha256);
  }

  // optional bytes mediaKey = 2;
  var $mediaKey = message.mediaKey;
  if ($mediaKey !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $mediaKey.length), writeBytes(bb, $mediaKey);
  }

  // optional bytes fileEncSha256 = 3;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $fileEncSha256.length), writeBytes(bb, $fileEncSha256);
  }

  // optional string directPath = 4;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $directPath);
  }

  // optional int64 mediaKeyTimestamp = 5;
  var $mediaKeyTimestamp = message.mediaKeyTimestamp;
  if ($mediaKeyTimestamp !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $mediaKeyTimestamp);
  }

  // optional string serverMediaType = 6;
  var $serverMediaType = message.serverMediaType;
  if ($serverMediaType !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $serverMediaType);
  }

  // optional bytes uploadToken = 7;
  var $uploadToken = message.uploadToken;
  if ($uploadToken !== undefined) {
    writeVarint32(bb, 58);
    writeVarint32(bb, $uploadToken.length), writeBytes(bb, $uploadToken);
  }

  // optional bytes validatedTimestamp = 8;
  var $validatedTimestamp = message.validatedTimestamp;
  if ($validatedTimestamp !== undefined) {
    writeVarint32(bb, 66);
    writeVarint32(bb, $validatedTimestamp.length), writeBytes(bb, $validatedTimestamp);
  }

  // optional bytes sidecar = 9;
  var $sidecar = message.sidecar;
  if ($sidecar !== undefined) {
    writeVarint32(bb, 74);
    writeVarint32(bb, $sidecar.length), writeBytes(bb, $sidecar);
  }

  // optional string objectId = 10;
  var $objectId = message.objectId;
  if ($objectId !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $objectId);
  }

  // optional string fbid = 11;
  var $fbid = message.fbid;
  if ($fbid !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $fbid);
  }

  // optional DownloadableThumbnail downloadableThumbnail = 12;
  var $downloadableThumbnail = message.downloadableThumbnail;
  if ($downloadableThumbnail !== undefined) {
    writeVarint32(bb, 98);
    var nested = popByteBuffer();
    _encodeDownloadableThumbnail($downloadableThumbnail, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string handle = 13;
  var $handle = message.handle;
  if ($handle !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $handle);
  }

  // optional string filename = 14;
  var $filename = message.filename;
  if ($filename !== undefined) {
    writeVarint32(bb, 114);
    writeString(bb, $filename);
  }

  // optional ProgressiveJpegDetails progressiveJpegDetails = 15;
  var $progressiveJpegDetails = message.progressiveJpegDetails;
  if ($progressiveJpegDetails !== undefined) {
    writeVarint32(bb, 122);
    var nested = popByteBuffer();
    _encodeProgressiveJpegDetails($progressiveJpegDetails, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeMediaEntry = function (binary) {
  return _decodeMediaEntry(wrapByteBuffer(binary));
}

function _decodeMediaEntry(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes fileSha256 = 1;
      case 1: {
        message.fileSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes mediaKey = 2;
      case 2: {
        message.mediaKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes fileEncSha256 = 3;
      case 3: {
        message.fileEncSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string directPath = 4;
      case 4: {
        message.directPath = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 mediaKeyTimestamp = 5;
      case 5: {
        message.mediaKeyTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string serverMediaType = 6;
      case 6: {
        message.serverMediaType = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes uploadToken = 7;
      case 7: {
        message.uploadToken = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes validatedTimestamp = 8;
      case 8: {
        message.validatedTimestamp = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes sidecar = 9;
      case 9: {
        message.sidecar = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string objectId = 10;
      case 10: {
        message.objectId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string fbid = 11;
      case 11: {
        message.fbid = readString(bb, readVarint32(bb));
        break;
      }

      // optional DownloadableThumbnail downloadableThumbnail = 12;
      case 12: {
        var limit = pushTemporaryLength(bb);
        message.downloadableThumbnail = _decodeDownloadableThumbnail(bb);
        bb.limit = limit;
        break;
      }

      // optional string handle = 13;
      case 13: {
        message.handle = readString(bb, readVarint32(bb));
        break;
      }

      // optional string filename = 14;
      case 14: {
        message.filename = readString(bb, readVarint32(bb));
        break;
      }

      // optional ProgressiveJpegDetails progressiveJpegDetails = 15;
      case 15: {
        var limit = pushTemporaryLength(bb);
        message.progressiveJpegDetails = _decodeProgressiveJpegDetails(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMediaNotifyMessage = function (message) {
  var bb = popByteBuffer();
  _encodeMediaNotifyMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeMediaNotifyMessage(message, bb) {
  // optional string expressPathUrl = 1;
  var $expressPathUrl = message.expressPathUrl;
  if ($expressPathUrl !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $expressPathUrl);
  }

  // optional bytes fileEncSha256 = 2;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $fileEncSha256.length), writeBytes(bb, $fileEncSha256);
  }

  // optional uint64 fileLength = 3;
  var $fileLength = message.fileLength;
  if ($fileLength !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $fileLength);
  }
};

exports.decodeMediaNotifyMessage = function (binary) {
  return _decodeMediaNotifyMessage(wrapByteBuffer(binary));
}

function _decodeMediaNotifyMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string expressPathUrl = 1;
      case 1: {
        message.expressPathUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes fileEncSha256 = 2;
      case 2: {
        message.fileEncSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint64 fileLength = 3;
      case 3: {
        message.fileLength = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMediaRetryNotification = function (message) {
  var bb = popByteBuffer();
  _encodeMediaRetryNotification(message, bb);
  return toUint8Array(bb);
}

function _encodeMediaRetryNotification(message, bb) {
  // optional string stanzaId = 1;
  var $stanzaId = message.stanzaId;
  if ($stanzaId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $stanzaId);
  }

  // optional string directPath = 2;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $directPath);
  }

  // optional ResultType result = 3;
  var $result = message.result;
  if ($result !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeResultType($result, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeMediaRetryNotification = function (binary) {
  return _decodeMediaRetryNotification(wrapByteBuffer(binary));
}

function _decodeMediaRetryNotification(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string stanzaId = 1;
      case 1: {
        message.stanzaId = readString(bb, readVarint32(bb));
        break;
      }

      // optional string directPath = 2;
      case 2: {
        message.directPath = readString(bb, readVarint32(bb));
        break;
      }

      // optional ResultType result = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.result = _decodeResultType(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMessage = function (message) {
  var bb = popByteBuffer();
  _encodeMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeMessage(message, bb) {
  // optional string conversation = 1;
  var $conversation = message.conversation;
  if ($conversation !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $conversation);
  }

  // optional SenderKeyDistributionMessage senderKeyDistributionMessage = 2;
  var $senderKeyDistributionMessage = message.senderKeyDistributionMessage;
  if ($senderKeyDistributionMessage !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeSenderKeyDistributionMessage($senderKeyDistributionMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ImageMessage imageMessage = 3;
  var $imageMessage = message.imageMessage;
  if ($imageMessage !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeImageMessage($imageMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ContactMessage contactMessage = 4;
  var $contactMessage = message.contactMessage;
  if ($contactMessage !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeContactMessage($contactMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LocationMessage locationMessage = 5;
  var $locationMessage = message.locationMessage;
  if ($locationMessage !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeLocationMessage($locationMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ExtendedTextMessage extendedTextMessage = 6;
  var $extendedTextMessage = message.extendedTextMessage;
  if ($extendedTextMessage !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeExtendedTextMessage($extendedTextMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DocumentMessage documentMessage = 7;
  var $documentMessage = message.documentMessage;
  if ($documentMessage !== undefined) {
    writeVarint32(bb, 58);
    var nested = popByteBuffer();
    _encodeDocumentMessage($documentMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AudioMessage audioMessage = 8;
  var $audioMessage = message.audioMessage;
  if ($audioMessage !== undefined) {
    writeVarint32(bb, 66);
    var nested = popByteBuffer();
    _encodeAudioMessage($audioMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional VideoMessage videoMessage = 9;
  var $videoMessage = message.videoMessage;
  if ($videoMessage !== undefined) {
    writeVarint32(bb, 74);
    var nested = popByteBuffer();
    _encodeVideoMessage($videoMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Call call = 10;
  var $call = message.call;
  if ($call !== undefined) {
    writeVarint32(bb, 82);
    var nested = popByteBuffer();
    _encodeCall($call, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Chat chat = 11;
  var $chat = message.chat;
  if ($chat !== undefined) {
    writeVarint32(bb, 90);
    var nested = popByteBuffer();
    _encodeChat($chat, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ProtocolMessage protocolMessage = 12;
  var $protocolMessage = message.protocolMessage;
  if ($protocolMessage !== undefined) {
    writeVarint32(bb, 98);
    var nested = popByteBuffer();
    _encodeProtocolMessage($protocolMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ContactsArrayMessage contactsArrayMessage = 13;
  var $contactsArrayMessage = message.contactsArrayMessage;
  if ($contactsArrayMessage !== undefined) {
    writeVarint32(bb, 106);
    var nested = popByteBuffer();
    _encodeContactsArrayMessage($contactsArrayMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional HighlyStructuredMessage highlyStructuredMessage = 14;
  var $highlyStructuredMessage = message.highlyStructuredMessage;
  if ($highlyStructuredMessage !== undefined) {
    writeVarint32(bb, 114);
    var nested = popByteBuffer();
    _encodeHighlyStructuredMessage($highlyStructuredMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SenderKeyDistributionMessage fastRatchetKeySenderKeyDistributionMessage = 15;
  var $fastRatchetKeySenderKeyDistributionMessage = message.fastRatchetKeySenderKeyDistributionMessage;
  if ($fastRatchetKeySenderKeyDistributionMessage !== undefined) {
    writeVarint32(bb, 122);
    var nested = popByteBuffer();
    _encodeSenderKeyDistributionMessage($fastRatchetKeySenderKeyDistributionMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SendPaymentMessage sendPaymentMessage = 16;
  var $sendPaymentMessage = message.sendPaymentMessage;
  if ($sendPaymentMessage !== undefined) {
    writeVarint32(bb, 130);
    var nested = popByteBuffer();
    _encodeSendPaymentMessage($sendPaymentMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LiveLocationMessage liveLocationMessage = 18;
  var $liveLocationMessage = message.liveLocationMessage;
  if ($liveLocationMessage !== undefined) {
    writeVarint32(bb, 146);
    var nested = popByteBuffer();
    _encodeLiveLocationMessage($liveLocationMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RequestPaymentMessage requestPaymentMessage = 22;
  var $requestPaymentMessage = message.requestPaymentMessage;
  if ($requestPaymentMessage !== undefined) {
    writeVarint32(bb, 178);
    var nested = popByteBuffer();
    _encodeRequestPaymentMessage($requestPaymentMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DeclinePaymentRequestMessage declinePaymentRequestMessage = 23;
  var $declinePaymentRequestMessage = message.declinePaymentRequestMessage;
  if ($declinePaymentRequestMessage !== undefined) {
    writeVarint32(bb, 186);
    var nested = popByteBuffer();
    _encodeDeclinePaymentRequestMessage($declinePaymentRequestMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional CancelPaymentRequestMessage cancelPaymentRequestMessage = 24;
  var $cancelPaymentRequestMessage = message.cancelPaymentRequestMessage;
  if ($cancelPaymentRequestMessage !== undefined) {
    writeVarint32(bb, 194);
    var nested = popByteBuffer();
    _encodeCancelPaymentRequestMessage($cancelPaymentRequestMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TemplateMessage templateMessage = 25;
  var $templateMessage = message.templateMessage;
  if ($templateMessage !== undefined) {
    writeVarint32(bb, 202);
    var nested = popByteBuffer();
    _encodeTemplateMessage($templateMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional StickerMessage stickerMessage = 26;
  var $stickerMessage = message.stickerMessage;
  if ($stickerMessage !== undefined) {
    writeVarint32(bb, 210);
    var nested = popByteBuffer();
    _encodeStickerMessage($stickerMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional GroupInviteMessage groupInviteMessage = 28;
  var $groupInviteMessage = message.groupInviteMessage;
  if ($groupInviteMessage !== undefined) {
    writeVarint32(bb, 226);
    var nested = popByteBuffer();
    _encodeGroupInviteMessage($groupInviteMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TemplateButtonReplyMessage templateButtonReplyMessage = 29;
  var $templateButtonReplyMessage = message.templateButtonReplyMessage;
  if ($templateButtonReplyMessage !== undefined) {
    writeVarint32(bb, 234);
    var nested = popByteBuffer();
    _encodeTemplateButtonReplyMessage($templateButtonReplyMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ProductMessage productMessage = 30;
  var $productMessage = message.productMessage;
  if ($productMessage !== undefined) {
    writeVarint32(bb, 242);
    var nested = popByteBuffer();
    _encodeProductMessage($productMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DeviceSentMessage deviceSentMessage = 31;
  var $deviceSentMessage = message.deviceSentMessage;
  if ($deviceSentMessage !== undefined) {
    writeVarint32(bb, 250);
    var nested = popByteBuffer();
    _encodeDeviceSentMessage($deviceSentMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MessageContextInfo messageContextInfo = 35;
  var $messageContextInfo = message.messageContextInfo;
  if ($messageContextInfo !== undefined) {
    writeVarint32(bb, 282);
    var nested = popByteBuffer();
    _encodeMessageContextInfo($messageContextInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ListMessage listMessage = 36;
  var $listMessage = message.listMessage;
  if ($listMessage !== undefined) {
    writeVarint32(bb, 290);
    var nested = popByteBuffer();
    _encodeListMessage($listMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage viewOnceMessage = 37;
  var $viewOnceMessage = message.viewOnceMessage;
  if ($viewOnceMessage !== undefined) {
    writeVarint32(bb, 298);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($viewOnceMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional OrderMessage orderMessage = 38;
  var $orderMessage = message.orderMessage;
  if ($orderMessage !== undefined) {
    writeVarint32(bb, 306);
    var nested = popByteBuffer();
    _encodeOrderMessage($orderMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ListResponseMessage listResponseMessage = 39;
  var $listResponseMessage = message.listResponseMessage;
  if ($listResponseMessage !== undefined) {
    writeVarint32(bb, 314);
    var nested = popByteBuffer();
    _encodeListResponseMessage($listResponseMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage ephemeralMessage = 40;
  var $ephemeralMessage = message.ephemeralMessage;
  if ($ephemeralMessage !== undefined) {
    writeVarint32(bb, 322);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($ephemeralMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional InvoiceMessage invoiceMessage = 41;
  var $invoiceMessage = message.invoiceMessage;
  if ($invoiceMessage !== undefined) {
    writeVarint32(bb, 330);
    var nested = popByteBuffer();
    _encodeInvoiceMessage($invoiceMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ButtonsMessage buttonsMessage = 42;
  var $buttonsMessage = message.buttonsMessage;
  if ($buttonsMessage !== undefined) {
    writeVarint32(bb, 338);
    var nested = popByteBuffer();
    _encodeButtonsMessage($buttonsMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ButtonsResponseMessage buttonsResponseMessage = 43;
  var $buttonsResponseMessage = message.buttonsResponseMessage;
  if ($buttonsResponseMessage !== undefined) {
    writeVarint32(bb, 346);
    var nested = popByteBuffer();
    _encodeButtonsResponseMessage($buttonsResponseMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PaymentInviteMessage paymentInviteMessage = 44;
  var $paymentInviteMessage = message.paymentInviteMessage;
  if ($paymentInviteMessage !== undefined) {
    writeVarint32(bb, 354);
    var nested = popByteBuffer();
    _encodePaymentInviteMessage($paymentInviteMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional InteractiveMessage interactiveMessage = 45;
  var $interactiveMessage = message.interactiveMessage;
  if ($interactiveMessage !== undefined) {
    writeVarint32(bb, 362);
    var nested = popByteBuffer();
    _encodeInteractiveMessage($interactiveMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ReactionMessage reactionMessage = 46;
  var $reactionMessage = message.reactionMessage;
  if ($reactionMessage !== undefined) {
    writeVarint32(bb, 370);
    var nested = popByteBuffer();
    _encodeReactionMessage($reactionMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional StickerSyncRMRMessage stickerSyncRmrMessage = 47;
  var $stickerSyncRmrMessage = message.stickerSyncRmrMessage;
  if ($stickerSyncRmrMessage !== undefined) {
    writeVarint32(bb, 378);
    var nested = popByteBuffer();
    _encodeStickerSyncRMRMessage($stickerSyncRmrMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional InteractiveResponseMessage interactiveResponseMessage = 48;
  var $interactiveResponseMessage = message.interactiveResponseMessage;
  if ($interactiveResponseMessage !== undefined) {
    writeVarint32(bb, 386);
    var nested = popByteBuffer();
    _encodeInteractiveResponseMessage($interactiveResponseMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PollCreationMessage pollCreationMessage = 49;
  var $pollCreationMessage = message.pollCreationMessage;
  if ($pollCreationMessage !== undefined) {
    writeVarint32(bb, 394);
    var nested = popByteBuffer();
    _encodePollCreationMessage($pollCreationMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PollUpdateMessage pollUpdateMessage = 50;
  var $pollUpdateMessage = message.pollUpdateMessage;
  if ($pollUpdateMessage !== undefined) {
    writeVarint32(bb, 402);
    var nested = popByteBuffer();
    _encodePollUpdateMessage($pollUpdateMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional KeepInChatMessage keepInChatMessage = 51;
  var $keepInChatMessage = message.keepInChatMessage;
  if ($keepInChatMessage !== undefined) {
    writeVarint32(bb, 410);
    var nested = popByteBuffer();
    _encodeKeepInChatMessage($keepInChatMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage documentWithCaptionMessage = 53;
  var $documentWithCaptionMessage = message.documentWithCaptionMessage;
  if ($documentWithCaptionMessage !== undefined) {
    writeVarint32(bb, 426);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($documentWithCaptionMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RequestPhoneNumberMessage requestPhoneNumberMessage = 54;
  var $requestPhoneNumberMessage = message.requestPhoneNumberMessage;
  if ($requestPhoneNumberMessage !== undefined) {
    writeVarint32(bb, 434);
    var nested = popByteBuffer();
    _encodeRequestPhoneNumberMessage($requestPhoneNumberMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage viewOnceMessageV2 = 55;
  var $viewOnceMessageV2 = message.viewOnceMessageV2;
  if ($viewOnceMessageV2 !== undefined) {
    writeVarint32(bb, 442);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($viewOnceMessageV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional EncReactionMessage encReactionMessage = 56;
  var $encReactionMessage = message.encReactionMessage;
  if ($encReactionMessage !== undefined) {
    writeVarint32(bb, 450);
    var nested = popByteBuffer();
    _encodeEncReactionMessage($encReactionMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage editedMessage = 58;
  var $editedMessage = message.editedMessage;
  if ($editedMessage !== undefined) {
    writeVarint32(bb, 466);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($editedMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage viewOnceMessageV2Extension = 59;
  var $viewOnceMessageV2Extension = message.viewOnceMessageV2Extension;
  if ($viewOnceMessageV2Extension !== undefined) {
    writeVarint32(bb, 474);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($viewOnceMessageV2Extension, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PollCreationMessage pollCreationMessageV2 = 60;
  var $pollCreationMessageV2 = message.pollCreationMessageV2;
  if ($pollCreationMessageV2 !== undefined) {
    writeVarint32(bb, 482);
    var nested = popByteBuffer();
    _encodePollCreationMessage($pollCreationMessageV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ScheduledCallCreationMessage scheduledCallCreationMessage = 61;
  var $scheduledCallCreationMessage = message.scheduledCallCreationMessage;
  if ($scheduledCallCreationMessage !== undefined) {
    writeVarint32(bb, 490);
    var nested = popByteBuffer();
    _encodeScheduledCallCreationMessage($scheduledCallCreationMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage groupMentionedMessage = 62;
  var $groupMentionedMessage = message.groupMentionedMessage;
  if ($groupMentionedMessage !== undefined) {
    writeVarint32(bb, 498);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($groupMentionedMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PinInChatMessage pinInChatMessage = 63;
  var $pinInChatMessage = message.pinInChatMessage;
  if ($pinInChatMessage !== undefined) {
    writeVarint32(bb, 506);
    var nested = popByteBuffer();
    _encodePinInChatMessage($pinInChatMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PollCreationMessage pollCreationMessageV3 = 64;
  var $pollCreationMessageV3 = message.pollCreationMessageV3;
  if ($pollCreationMessageV3 !== undefined) {
    writeVarint32(bb, 514);
    var nested = popByteBuffer();
    _encodePollCreationMessage($pollCreationMessageV3, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ScheduledCallEditMessage scheduledCallEditMessage = 65;
  var $scheduledCallEditMessage = message.scheduledCallEditMessage;
  if ($scheduledCallEditMessage !== undefined) {
    writeVarint32(bb, 522);
    var nested = popByteBuffer();
    _encodeScheduledCallEditMessage($scheduledCallEditMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional VideoMessage ptvMessage = 66;
  var $ptvMessage = message.ptvMessage;
  if ($ptvMessage !== undefined) {
    writeVarint32(bb, 530);
    var nested = popByteBuffer();
    _encodeVideoMessage($ptvMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage botInvokeMessage = 67;
  var $botInvokeMessage = message.botInvokeMessage;
  if ($botInvokeMessage !== undefined) {
    writeVarint32(bb, 538);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($botInvokeMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional CallLogMessage callLogMesssage = 69;
  var $callLogMesssage = message.callLogMesssage;
  if ($callLogMesssage !== undefined) {
    writeVarint32(bb, 554);
    var nested = popByteBuffer();
    _encodeCallLogMessage($callLogMesssage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MessageHistoryBundle messageHistoryBundle = 70;
  var $messageHistoryBundle = message.messageHistoryBundle;
  if ($messageHistoryBundle !== undefined) {
    writeVarint32(bb, 562);
    var nested = popByteBuffer();
    _encodeMessageHistoryBundle($messageHistoryBundle, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional EncCommentMessage encCommentMessage = 71;
  var $encCommentMessage = message.encCommentMessage;
  if ($encCommentMessage !== undefined) {
    writeVarint32(bb, 570);
    var nested = popByteBuffer();
    _encodeEncCommentMessage($encCommentMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional BCallMessage bcallMessage = 72;
  var $bcallMessage = message.bcallMessage;
  if ($bcallMessage !== undefined) {
    writeVarint32(bb, 578);
    var nested = popByteBuffer();
    _encodeBCallMessage($bcallMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional FutureProofMessage lottieStickerMessage = 74;
  var $lottieStickerMessage = message.lottieStickerMessage;
  if ($lottieStickerMessage !== undefined) {
    writeVarint32(bb, 594);
    var nested = popByteBuffer();
    _encodeFutureProofMessage($lottieStickerMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional EventMessage eventMessage = 75;
  var $eventMessage = message.eventMessage;
  if ($eventMessage !== undefined) {
    writeVarint32(bb, 602);
    var nested = popByteBuffer();
    _encodeEventMessage($eventMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional EncEventResponseMessage encEventResponseMessage = 76;
  var $encEventResponseMessage = message.encEventResponseMessage;
  if ($encEventResponseMessage !== undefined) {
    writeVarint32(bb, 610);
    var nested = popByteBuffer();
    _encodeEncEventResponseMessage($encEventResponseMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional CommentMessage commentMessage = 77;
  var $commentMessage = message.commentMessage;
  if ($commentMessage !== undefined) {
    writeVarint32(bb, 618);
    var nested = popByteBuffer();
    _encodeCommentMessage($commentMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional NewsletterAdminInviteMessage newsletterAdminInviteMessage = 78;
  var $newsletterAdminInviteMessage = message.newsletterAdminInviteMessage;
  if ($newsletterAdminInviteMessage !== undefined) {
    writeVarint32(bb, 626);
    var nested = popByteBuffer();
    _encodeNewsletterAdminInviteMessage($newsletterAdminInviteMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PlaceholderMessage placeholderMessage = 80;
  var $placeholderMessage = message.placeholderMessage;
  if ($placeholderMessage !== undefined) {
    writeVarint32(bb, 642);
    var nested = popByteBuffer();
    _encodePlaceholderMessage($placeholderMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SecretEncryptedMessage secretEncryptedMessage = 82;
  var $secretEncryptedMessage = message.secretEncryptedMessage;
  if ($secretEncryptedMessage !== undefined) {
    writeVarint32(bb, 658);
    var nested = popByteBuffer();
    _encodeSecretEncryptedMessage($secretEncryptedMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeMessage = function (binary) {
  return _decodeMessage(wrapByteBuffer(binary));
}

function _decodeMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string conversation = 1;
      case 1: {
        message.conversation = readString(bb, readVarint32(bb));
        break;
      }

      // optional SenderKeyDistributionMessage senderKeyDistributionMessage = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.senderKeyDistributionMessage = _decodeSenderKeyDistributionMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ImageMessage imageMessage = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.imageMessage = _decodeImageMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ContactMessage contactMessage = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.contactMessage = _decodeContactMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional LocationMessage locationMessage = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.locationMessage = _decodeLocationMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ExtendedTextMessage extendedTextMessage = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.extendedTextMessage = _decodeExtendedTextMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional DocumentMessage documentMessage = 7;
      case 7: {
        var limit = pushTemporaryLength(bb);
        message.documentMessage = _decodeDocumentMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional AudioMessage audioMessage = 8;
      case 8: {
        var limit = pushTemporaryLength(bb);
        message.audioMessage = _decodeAudioMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional VideoMessage videoMessage = 9;
      case 9: {
        var limit = pushTemporaryLength(bb);
        message.videoMessage = _decodeVideoMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional Call call = 10;
      case 10: {
        var limit = pushTemporaryLength(bb);
        message.call = _decodeCall(bb);
        bb.limit = limit;
        break;
      }

      // optional Chat chat = 11;
      case 11: {
        var limit = pushTemporaryLength(bb);
        message.chat = _decodeChat(bb);
        bb.limit = limit;
        break;
      }

      // optional ProtocolMessage protocolMessage = 12;
      case 12: {
        var limit = pushTemporaryLength(bb);
        message.protocolMessage = _decodeProtocolMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ContactsArrayMessage contactsArrayMessage = 13;
      case 13: {
        var limit = pushTemporaryLength(bb);
        message.contactsArrayMessage = _decodeContactsArrayMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional HighlyStructuredMessage highlyStructuredMessage = 14;
      case 14: {
        var limit = pushTemporaryLength(bb);
        message.highlyStructuredMessage = _decodeHighlyStructuredMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional SenderKeyDistributionMessage fastRatchetKeySenderKeyDistributionMessage = 15;
      case 15: {
        var limit = pushTemporaryLength(bb);
        message.fastRatchetKeySenderKeyDistributionMessage = _decodeSenderKeyDistributionMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional SendPaymentMessage sendPaymentMessage = 16;
      case 16: {
        var limit = pushTemporaryLength(bb);
        message.sendPaymentMessage = _decodeSendPaymentMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional LiveLocationMessage liveLocationMessage = 18;
      case 18: {
        var limit = pushTemporaryLength(bb);
        message.liveLocationMessage = _decodeLiveLocationMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional RequestPaymentMessage requestPaymentMessage = 22;
      case 22: {
        var limit = pushTemporaryLength(bb);
        message.requestPaymentMessage = _decodeRequestPaymentMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional DeclinePaymentRequestMessage declinePaymentRequestMessage = 23;
      case 23: {
        var limit = pushTemporaryLength(bb);
        message.declinePaymentRequestMessage = _decodeDeclinePaymentRequestMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional CancelPaymentRequestMessage cancelPaymentRequestMessage = 24;
      case 24: {
        var limit = pushTemporaryLength(bb);
        message.cancelPaymentRequestMessage = _decodeCancelPaymentRequestMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional TemplateMessage templateMessage = 25;
      case 25: {
        var limit = pushTemporaryLength(bb);
        message.templateMessage = _decodeTemplateMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional StickerMessage stickerMessage = 26;
      case 26: {
        var limit = pushTemporaryLength(bb);
        message.stickerMessage = _decodeStickerMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional GroupInviteMessage groupInviteMessage = 28;
      case 28: {
        var limit = pushTemporaryLength(bb);
        message.groupInviteMessage = _decodeGroupInviteMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional TemplateButtonReplyMessage templateButtonReplyMessage = 29;
      case 29: {
        var limit = pushTemporaryLength(bb);
        message.templateButtonReplyMessage = _decodeTemplateButtonReplyMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ProductMessage productMessage = 30;
      case 30: {
        var limit = pushTemporaryLength(bb);
        message.productMessage = _decodeProductMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional DeviceSentMessage deviceSentMessage = 31;
      case 31: {
        var limit = pushTemporaryLength(bb);
        message.deviceSentMessage = _decodeDeviceSentMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional MessageContextInfo messageContextInfo = 35;
      case 35: {
        var limit = pushTemporaryLength(bb);
        message.messageContextInfo = _decodeMessageContextInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional ListMessage listMessage = 36;
      case 36: {
        var limit = pushTemporaryLength(bb);
        message.listMessage = _decodeListMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage viewOnceMessage = 37;
      case 37: {
        var limit = pushTemporaryLength(bb);
        message.viewOnceMessage = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional OrderMessage orderMessage = 38;
      case 38: {
        var limit = pushTemporaryLength(bb);
        message.orderMessage = _decodeOrderMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ListResponseMessage listResponseMessage = 39;
      case 39: {
        var limit = pushTemporaryLength(bb);
        message.listResponseMessage = _decodeListResponseMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage ephemeralMessage = 40;
      case 40: {
        var limit = pushTemporaryLength(bb);
        message.ephemeralMessage = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional InvoiceMessage invoiceMessage = 41;
      case 41: {
        var limit = pushTemporaryLength(bb);
        message.invoiceMessage = _decodeInvoiceMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ButtonsMessage buttonsMessage = 42;
      case 42: {
        var limit = pushTemporaryLength(bb);
        message.buttonsMessage = _decodeButtonsMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ButtonsResponseMessage buttonsResponseMessage = 43;
      case 43: {
        var limit = pushTemporaryLength(bb);
        message.buttonsResponseMessage = _decodeButtonsResponseMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PaymentInviteMessage paymentInviteMessage = 44;
      case 44: {
        var limit = pushTemporaryLength(bb);
        message.paymentInviteMessage = _decodePaymentInviteMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional InteractiveMessage interactiveMessage = 45;
      case 45: {
        var limit = pushTemporaryLength(bb);
        message.interactiveMessage = _decodeInteractiveMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ReactionMessage reactionMessage = 46;
      case 46: {
        var limit = pushTemporaryLength(bb);
        message.reactionMessage = _decodeReactionMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional StickerSyncRMRMessage stickerSyncRmrMessage = 47;
      case 47: {
        var limit = pushTemporaryLength(bb);
        message.stickerSyncRmrMessage = _decodeStickerSyncRMRMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional InteractiveResponseMessage interactiveResponseMessage = 48;
      case 48: {
        var limit = pushTemporaryLength(bb);
        message.interactiveResponseMessage = _decodeInteractiveResponseMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PollCreationMessage pollCreationMessage = 49;
      case 49: {
        var limit = pushTemporaryLength(bb);
        message.pollCreationMessage = _decodePollCreationMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PollUpdateMessage pollUpdateMessage = 50;
      case 50: {
        var limit = pushTemporaryLength(bb);
        message.pollUpdateMessage = _decodePollUpdateMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional KeepInChatMessage keepInChatMessage = 51;
      case 51: {
        var limit = pushTemporaryLength(bb);
        message.keepInChatMessage = _decodeKeepInChatMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage documentWithCaptionMessage = 53;
      case 53: {
        var limit = pushTemporaryLength(bb);
        message.documentWithCaptionMessage = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional RequestPhoneNumberMessage requestPhoneNumberMessage = 54;
      case 54: {
        var limit = pushTemporaryLength(bb);
        message.requestPhoneNumberMessage = _decodeRequestPhoneNumberMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage viewOnceMessageV2 = 55;
      case 55: {
        var limit = pushTemporaryLength(bb);
        message.viewOnceMessageV2 = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional EncReactionMessage encReactionMessage = 56;
      case 56: {
        var limit = pushTemporaryLength(bb);
        message.encReactionMessage = _decodeEncReactionMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage editedMessage = 58;
      case 58: {
        var limit = pushTemporaryLength(bb);
        message.editedMessage = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage viewOnceMessageV2Extension = 59;
      case 59: {
        var limit = pushTemporaryLength(bb);
        message.viewOnceMessageV2Extension = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PollCreationMessage pollCreationMessageV2 = 60;
      case 60: {
        var limit = pushTemporaryLength(bb);
        message.pollCreationMessageV2 = _decodePollCreationMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ScheduledCallCreationMessage scheduledCallCreationMessage = 61;
      case 61: {
        var limit = pushTemporaryLength(bb);
        message.scheduledCallCreationMessage = _decodeScheduledCallCreationMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage groupMentionedMessage = 62;
      case 62: {
        var limit = pushTemporaryLength(bb);
        message.groupMentionedMessage = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PinInChatMessage pinInChatMessage = 63;
      case 63: {
        var limit = pushTemporaryLength(bb);
        message.pinInChatMessage = _decodePinInChatMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PollCreationMessage pollCreationMessageV3 = 64;
      case 64: {
        var limit = pushTemporaryLength(bb);
        message.pollCreationMessageV3 = _decodePollCreationMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional ScheduledCallEditMessage scheduledCallEditMessage = 65;
      case 65: {
        var limit = pushTemporaryLength(bb);
        message.scheduledCallEditMessage = _decodeScheduledCallEditMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional VideoMessage ptvMessage = 66;
      case 66: {
        var limit = pushTemporaryLength(bb);
        message.ptvMessage = _decodeVideoMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage botInvokeMessage = 67;
      case 67: {
        var limit = pushTemporaryLength(bb);
        message.botInvokeMessage = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional CallLogMessage callLogMesssage = 69;
      case 69: {
        var limit = pushTemporaryLength(bb);
        message.callLogMesssage = _decodeCallLogMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional MessageHistoryBundle messageHistoryBundle = 70;
      case 70: {
        var limit = pushTemporaryLength(bb);
        message.messageHistoryBundle = _decodeMessageHistoryBundle(bb);
        bb.limit = limit;
        break;
      }

      // optional EncCommentMessage encCommentMessage = 71;
      case 71: {
        var limit = pushTemporaryLength(bb);
        message.encCommentMessage = _decodeEncCommentMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional BCallMessage bcallMessage = 72;
      case 72: {
        var limit = pushTemporaryLength(bb);
        message.bcallMessage = _decodeBCallMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional FutureProofMessage lottieStickerMessage = 74;
      case 74: {
        var limit = pushTemporaryLength(bb);
        message.lottieStickerMessage = _decodeFutureProofMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional EventMessage eventMessage = 75;
      case 75: {
        var limit = pushTemporaryLength(bb);
        message.eventMessage = _decodeEventMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional EncEventResponseMessage encEventResponseMessage = 76;
      case 76: {
        var limit = pushTemporaryLength(bb);
        message.encEventResponseMessage = _decodeEncEventResponseMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional CommentMessage commentMessage = 77;
      case 77: {
        var limit = pushTemporaryLength(bb);
        message.commentMessage = _decodeCommentMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional NewsletterAdminInviteMessage newsletterAdminInviteMessage = 78;
      case 78: {
        var limit = pushTemporaryLength(bb);
        message.newsletterAdminInviteMessage = _decodeNewsletterAdminInviteMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PlaceholderMessage placeholderMessage = 80;
      case 80: {
        var limit = pushTemporaryLength(bb);
        message.placeholderMessage = _decodePlaceholderMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional SecretEncryptedMessage secretEncryptedMessage = 82;
      case 82: {
        var limit = pushTemporaryLength(bb);
        message.secretEncryptedMessage = _decodeSecretEncryptedMessage(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMessageAddOnContextInfo = function (message) {
  var bb = popByteBuffer();
  _encodeMessageAddOnContextInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageAddOnContextInfo(message, bb) {
  // optional uint32 messageAddOnDurationInSecs = 1;
  var $messageAddOnDurationInSecs = message.messageAddOnDurationInSecs;
  if ($messageAddOnDurationInSecs !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $messageAddOnDurationInSecs);
  }
};

exports.decodeMessageAddOnContextInfo = function (binary) {
  return _decodeMessageAddOnContextInfo(wrapByteBuffer(binary));
}

function _decodeMessageAddOnContextInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 messageAddOnDurationInSecs = 1;
      case 1: {
        message.messageAddOnDurationInSecs = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMessageContextInfo = function (message) {
  var bb = popByteBuffer();
  _encodeMessageContextInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageContextInfo(message, bb) {
  // optional DeviceListMetadata deviceListMetadata = 1;
  var $deviceListMetadata = message.deviceListMetadata;
  if ($deviceListMetadata !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeDeviceListMetadata($deviceListMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int32 deviceListMetadataVersion = 2;
  var $deviceListMetadataVersion = message.deviceListMetadataVersion;
  if ($deviceListMetadataVersion !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($deviceListMetadataVersion));
  }

  // optional bytes messageSecret = 3;
  var $messageSecret = message.messageSecret;
  if ($messageSecret !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $messageSecret.length), writeBytes(bb, $messageSecret);
  }

  // optional bytes paddingBytes = 4;
  var $paddingBytes = message.paddingBytes;
  if ($paddingBytes !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $paddingBytes.length), writeBytes(bb, $paddingBytes);
  }

  // optional uint32 messageAddOnDurationInSecs = 5;
  var $messageAddOnDurationInSecs = message.messageAddOnDurationInSecs;
  if ($messageAddOnDurationInSecs !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, $messageAddOnDurationInSecs);
  }

  // optional bytes botMessageSecret = 6;
  var $botMessageSecret = message.botMessageSecret;
  if ($botMessageSecret !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $botMessageSecret.length), writeBytes(bb, $botMessageSecret);
  }

  // optional BotMetadata botMetadata = 7;
  var $botMetadata = message.botMetadata;
  if ($botMetadata !== undefined) {
    writeVarint32(bb, 58);
    var nested = popByteBuffer();
    _encodeBotMetadata($botMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int32 reportingTokenVersion = 8;
  var $reportingTokenVersion = message.reportingTokenVersion;
  if ($reportingTokenVersion !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($reportingTokenVersion));
  }
};

exports.decodeMessageContextInfo = function (binary) {
  return _decodeMessageContextInfo(wrapByteBuffer(binary));
}

function _decodeMessageContextInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional DeviceListMetadata deviceListMetadata = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.deviceListMetadata = _decodeDeviceListMetadata(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 deviceListMetadataVersion = 2;
      case 2: {
        message.deviceListMetadataVersion = readVarint32(bb);
        break;
      }

      // optional bytes messageSecret = 3;
      case 3: {
        message.messageSecret = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes paddingBytes = 4;
      case 4: {
        message.paddingBytes = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 messageAddOnDurationInSecs = 5;
      case 5: {
        message.messageAddOnDurationInSecs = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes botMessageSecret = 6;
      case 6: {
        message.botMessageSecret = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional BotMetadata botMetadata = 7;
      case 7: {
        var limit = pushTemporaryLength(bb);
        message.botMetadata = _decodeBotMetadata(bb);
        bb.limit = limit;
        break;
      }

      // optional int32 reportingTokenVersion = 8;
      case 8: {
        message.reportingTokenVersion = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMessageKey = function (message) {
  var bb = popByteBuffer();
  _encodeMessageKey(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageKey(message, bb) {
  // optional string remoteJid = 1;
  var $remoteJid = message.remoteJid;
  if ($remoteJid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $remoteJid);
  }

  // optional bool fromMe = 2;
  var $fromMe = message.fromMe;
  if ($fromMe !== undefined) {
    writeVarint32(bb, 16);
    writeByte(bb, $fromMe ? 1 : 0);
  }

  // optional string id = 3;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $id);
  }

  // optional string participant = 4;
  var $participant = message.participant;
  if ($participant !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $participant);
  }
};

exports.decodeMessageKey = function (binary) {
  return _decodeMessageKey(wrapByteBuffer(binary));
}

function _decodeMessageKey(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string remoteJid = 1;
      case 1: {
        message.remoteJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool fromMe = 2;
      case 2: {
        message.fromMe = !!readByte(bb);
        break;
      }

      // optional string id = 3;
      case 3: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string participant = 4;
      case 4: {
        message.participant = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMessageSecretMessage = function (message) {
  var bb = popByteBuffer();
  _encodeMessageSecretMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeMessageSecretMessage(message, bb) {
  // optional sfixed32 version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 13);
    writeInt32(bb, $version);
  }

  // optional bytes encIv = 2;
  var $encIv = message.encIv;
  if ($encIv !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $encIv.length), writeBytes(bb, $encIv);
  }

  // optional bytes encPayload = 3;
  var $encPayload = message.encPayload;
  if ($encPayload !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $encPayload.length), writeBytes(bb, $encPayload);
  }
};

exports.decodeMessageSecretMessage = function (binary) {
  return _decodeMessageSecretMessage(wrapByteBuffer(binary));
}

function _decodeMessageSecretMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional sfixed32 version = 1;
      case 1: {
        message.version = readInt32(bb);
        break;
      }

      // optional bytes encIv = 2;
      case 2: {
        message.encIv = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes encPayload = 3;
      case 3: {
        message.encPayload = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMoney = function (message) {
  var bb = popByteBuffer();
  _encodeMoney(message, bb);
  return toUint8Array(bb);
}

function _encodeMoney(message, bb) {
  // optional int64 value = 1;
  var $value = message.value;
  if ($value !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $value);
  }

  // optional uint32 offset = 2;
  var $offset = message.offset;
  if ($offset !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $offset);
  }

  // optional string currencyCode = 3;
  var $currencyCode = message.currencyCode;
  if ($currencyCode !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $currencyCode);
  }
};

exports.decodeMoney = function (binary) {
  return _decodeMoney(wrapByteBuffer(binary));
}

function _decodeMoney(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 value = 1;
      case 1: {
        message.value = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional uint32 offset = 2;
      case 2: {
        message.offset = readVarint32(bb) >>> 0;
        break;
      }

      // optional string currencyCode = 3;
      case 3: {
        message.currencyCode = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMsgOpaqueData = function (message) {
  var bb = popByteBuffer();
  _encodeMsgOpaqueData(message, bb);
  return toUint8Array(bb);
}

function _encodeMsgOpaqueData(message, bb) {
  // optional string body = 1;
  var $body = message.body;
  if ($body !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $body);
  }

  // optional string caption = 3;
  var $caption = message.caption;
  if ($caption !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $caption);
  }

  // optional double lng = 5;
  var $lng = message.lng;
  if ($lng !== undefined) {
    writeVarint32(bb, 41);
    writeDouble(bb, $lng);
  }

  // optional bool isLive = 6;
  var $isLive = message.isLive;
  if ($isLive !== undefined) {
    writeVarint32(bb, 48);
    writeByte(bb, $isLive ? 1 : 0);
  }

  // optional double lat = 7;
  var $lat = message.lat;
  if ($lat !== undefined) {
    writeVarint32(bb, 57);
    writeDouble(bb, $lat);
  }

  // optional int32 paymentAmount1000 = 8;
  var $paymentAmount1000 = message.paymentAmount1000;
  if ($paymentAmount1000 !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($paymentAmount1000));
  }

  // optional string paymentNoteMsgBody = 9;
  var $paymentNoteMsgBody = message.paymentNoteMsgBody;
  if ($paymentNoteMsgBody !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $paymentNoteMsgBody);
  }

  // optional string canonicalUrl = 10;
  var $canonicalUrl = message.canonicalUrl;
  if ($canonicalUrl !== undefined) {
    writeVarint32(bb, 82);
    writeString(bb, $canonicalUrl);
  }

  // optional string matchedText = 11;
  var $matchedText = message.matchedText;
  if ($matchedText !== undefined) {
    writeVarint32(bb, 90);
    writeString(bb, $matchedText);
  }

  // optional string title = 12;
  var $title = message.title;
  if ($title !== undefined) {
    writeVarint32(bb, 98);
    writeString(bb, $title);
  }

  // optional string description = 13;
  var $description = message.description;
  if ($description !== undefined) {
    writeVarint32(bb, 106);
    writeString(bb, $description);
  }

  // optional bytes futureproofBuffer = 14;
  var $futureproofBuffer = message.futureproofBuffer;
  if ($futureproofBuffer !== undefined) {
    writeVarint32(bb, 114);
    writeVarint32(bb, $futureproofBuffer.length), writeBytes(bb, $futureproofBuffer);
  }

  // optional string clientUrl = 15;
  var $clientUrl = message.clientUrl;
  if ($clientUrl !== undefined) {
    writeVarint32(bb, 122);
    writeString(bb, $clientUrl);
  }

  // optional string loc = 16;
  var $loc = message.loc;
  if ($loc !== undefined) {
    writeVarint32(bb, 130);
    writeString(bb, $loc);
  }

  // optional string pollName = 17;
  var $pollName = message.pollName;
  if ($pollName !== undefined) {
    writeVarint32(bb, 138);
    writeString(bb, $pollName);
  }

  // repeated PollOption pollOptions = 18;
  var array$pollOptions = message.pollOptions;
  if (array$pollOptions !== undefined) {
    for (var i = 0; i < array$pollOptions.length; i++) {
      var value = array$pollOptions[i];
      writeVarint32(bb, 146);
      var nested = popByteBuffer();
      _encodePollOption(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional uint32 pollSelectableOptionsCount = 20;
  var $pollSelectableOptionsCount = message.pollSelectableOptionsCount;
  if ($pollSelectableOptionsCount !== undefined) {
    writeVarint32(bb, 160);
    writeVarint32(bb, $pollSelectableOptionsCount);
  }

  // optional bytes messageSecret = 21;
  var $messageSecret = message.messageSecret;
  if ($messageSecret !== undefined) {
    writeVarint32(bb, 170);
    writeVarint32(bb, $messageSecret.length), writeBytes(bb, $messageSecret);
  }

  // optional string originalSelfAuthor = 51;
  var $originalSelfAuthor = message.originalSelfAuthor;
  if ($originalSelfAuthor !== undefined) {
    writeVarint32(bb, 410);
    writeString(bb, $originalSelfAuthor);
  }

  // optional int64 senderTimestampMs = 22;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    writeVarint32(bb, 176);
    writeVarint64(bb, $senderTimestampMs);
  }

  // optional string pollUpdateParentKey = 23;
  var $pollUpdateParentKey = message.pollUpdateParentKey;
  if ($pollUpdateParentKey !== undefined) {
    writeVarint32(bb, 186);
    writeString(bb, $pollUpdateParentKey);
  }

  // optional PollEncValue encPollVote = 24;
  var $encPollVote = message.encPollVote;
  if ($encPollVote !== undefined) {
    writeVarint32(bb, 194);
    var nested = popByteBuffer();
    _encodePollEncValue($encPollVote, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool isSentCagPollCreation = 28;
  var $isSentCagPollCreation = message.isSentCagPollCreation;
  if ($isSentCagPollCreation !== undefined) {
    writeVarint32(bb, 224);
    writeByte(bb, $isSentCagPollCreation ? 1 : 0);
  }

  // optional string encReactionTargetMessageKey = 25;
  var $encReactionTargetMessageKey = message.encReactionTargetMessageKey;
  if ($encReactionTargetMessageKey !== undefined) {
    writeVarint32(bb, 202);
    writeString(bb, $encReactionTargetMessageKey);
  }

  // optional bytes encReactionEncPayload = 26;
  var $encReactionEncPayload = message.encReactionEncPayload;
  if ($encReactionEncPayload !== undefined) {
    writeVarint32(bb, 210);
    writeVarint32(bb, $encReactionEncPayload.length), writeBytes(bb, $encReactionEncPayload);
  }

  // optional bytes encReactionEncIv = 27;
  var $encReactionEncIv = message.encReactionEncIv;
  if ($encReactionEncIv !== undefined) {
    writeVarint32(bb, 218);
    writeVarint32(bb, $encReactionEncIv.length), writeBytes(bb, $encReactionEncIv);
  }

  // optional bytes botMessageSecret = 29;
  var $botMessageSecret = message.botMessageSecret;
  if ($botMessageSecret !== undefined) {
    writeVarint32(bb, 234);
    writeVarint32(bb, $botMessageSecret.length), writeBytes(bb, $botMessageSecret);
  }

  // optional string targetMessageKey = 30;
  var $targetMessageKey = message.targetMessageKey;
  if ($targetMessageKey !== undefined) {
    writeVarint32(bb, 242);
    writeString(bb, $targetMessageKey);
  }

  // optional bytes encPayload = 31;
  var $encPayload = message.encPayload;
  if ($encPayload !== undefined) {
    writeVarint32(bb, 250);
    writeVarint32(bb, $encPayload.length), writeBytes(bb, $encPayload);
  }

  // optional bytes encIv = 32;
  var $encIv = message.encIv;
  if ($encIv !== undefined) {
    writeVarint32(bb, 258);
    writeVarint32(bb, $encIv.length), writeBytes(bb, $encIv);
  }

  // optional string eventName = 33;
  var $eventName = message.eventName;
  if ($eventName !== undefined) {
    writeVarint32(bb, 266);
    writeString(bb, $eventName);
  }

  // optional bool isEventCanceled = 34;
  var $isEventCanceled = message.isEventCanceled;
  if ($isEventCanceled !== undefined) {
    writeVarint32(bb, 272);
    writeByte(bb, $isEventCanceled ? 1 : 0);
  }

  // optional string eventDescription = 35;
  var $eventDescription = message.eventDescription;
  if ($eventDescription !== undefined) {
    writeVarint32(bb, 282);
    writeString(bb, $eventDescription);
  }

  // optional string eventJoinLink = 36;
  var $eventJoinLink = message.eventJoinLink;
  if ($eventJoinLink !== undefined) {
    writeVarint32(bb, 290);
    writeString(bb, $eventJoinLink);
  }

  // optional int64 eventStartTime = 37;
  var $eventStartTime = message.eventStartTime;
  if ($eventStartTime !== undefined) {
    writeVarint32(bb, 296);
    writeVarint64(bb, $eventStartTime);
  }

  // optional EventLocation eventLocation = 38;
  var $eventLocation = message.eventLocation;
  if ($eventLocation !== undefined) {
    writeVarint32(bb, 306);
    var nested = popByteBuffer();
    _encodeEventLocation($eventLocation, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeMsgOpaqueData = function (binary) {
  return _decodeMsgOpaqueData(wrapByteBuffer(binary));
}

function _decodeMsgOpaqueData(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string body = 1;
      case 1: {
        message.body = readString(bb, readVarint32(bb));
        break;
      }

      // optional string caption = 3;
      case 3: {
        message.caption = readString(bb, readVarint32(bb));
        break;
      }

      // optional double lng = 5;
      case 5: {
        message.lng = readDouble(bb);
        break;
      }

      // optional bool isLive = 6;
      case 6: {
        message.isLive = !!readByte(bb);
        break;
      }

      // optional double lat = 7;
      case 7: {
        message.lat = readDouble(bb);
        break;
      }

      // optional int32 paymentAmount1000 = 8;
      case 8: {
        message.paymentAmount1000 = readVarint32(bb);
        break;
      }

      // optional string paymentNoteMsgBody = 9;
      case 9: {
        message.paymentNoteMsgBody = readString(bb, readVarint32(bb));
        break;
      }

      // optional string canonicalUrl = 10;
      case 10: {
        message.canonicalUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string matchedText = 11;
      case 11: {
        message.matchedText = readString(bb, readVarint32(bb));
        break;
      }

      // optional string title = 12;
      case 12: {
        message.title = readString(bb, readVarint32(bb));
        break;
      }

      // optional string description = 13;
      case 13: {
        message.description = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes futureproofBuffer = 14;
      case 14: {
        message.futureproofBuffer = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string clientUrl = 15;
      case 15: {
        message.clientUrl = readString(bb, readVarint32(bb));
        break;
      }

      // optional string loc = 16;
      case 16: {
        message.loc = readString(bb, readVarint32(bb));
        break;
      }

      // optional string pollName = 17;
      case 17: {
        message.pollName = readString(bb, readVarint32(bb));
        break;
      }

      // repeated PollOption pollOptions = 18;
      case 18: {
        var limit = pushTemporaryLength(bb);
        var values = message.pollOptions || (message.pollOptions = []);
        values.push(_decodePollOption(bb));
        bb.limit = limit;
        break;
      }

      // optional uint32 pollSelectableOptionsCount = 20;
      case 20: {
        message.pollSelectableOptionsCount = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes messageSecret = 21;
      case 21: {
        message.messageSecret = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string originalSelfAuthor = 51;
      case 51: {
        message.originalSelfAuthor = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 senderTimestampMs = 22;
      case 22: {
        message.senderTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional string pollUpdateParentKey = 23;
      case 23: {
        message.pollUpdateParentKey = readString(bb, readVarint32(bb));
        break;
      }

      // optional PollEncValue encPollVote = 24;
      case 24: {
        var limit = pushTemporaryLength(bb);
        message.encPollVote = _decodePollEncValue(bb);
        bb.limit = limit;
        break;
      }

      // optional bool isSentCagPollCreation = 28;
      case 28: {
        message.isSentCagPollCreation = !!readByte(bb);
        break;
      }

      // optional string encReactionTargetMessageKey = 25;
      case 25: {
        message.encReactionTargetMessageKey = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes encReactionEncPayload = 26;
      case 26: {
        message.encReactionEncPayload = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes encReactionEncIv = 27;
      case 27: {
        message.encReactionEncIv = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes botMessageSecret = 29;
      case 29: {
        message.botMessageSecret = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string targetMessageKey = 30;
      case 30: {
        message.targetMessageKey = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes encPayload = 31;
      case 31: {
        message.encPayload = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes encIv = 32;
      case 32: {
        message.encIv = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string eventName = 33;
      case 33: {
        message.eventName = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool isEventCanceled = 34;
      case 34: {
        message.isEventCanceled = !!readByte(bb);
        break;
      }

      // optional string eventDescription = 35;
      case 35: {
        message.eventDescription = readString(bb, readVarint32(bb));
        break;
      }

      // optional string eventJoinLink = 36;
      case 36: {
        message.eventJoinLink = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 eventStartTime = 37;
      case 37: {
        message.eventStartTime = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional EventLocation eventLocation = 38;
      case 38: {
        var limit = pushTemporaryLength(bb);
        message.eventLocation = _decodeEventLocation(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeMsgRowOpaqueData = function (message) {
  var bb = popByteBuffer();
  _encodeMsgRowOpaqueData(message, bb);
  return toUint8Array(bb);
}

function _encodeMsgRowOpaqueData(message, bb) {
  // optional MsgOpaqueData currentMsg = 1;
  var $currentMsg = message.currentMsg;
  if ($currentMsg !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeMsgOpaqueData($currentMsg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MsgOpaqueData quotedMsg = 2;
  var $quotedMsg = message.quotedMsg;
  if ($quotedMsg !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeMsgOpaqueData($quotedMsg, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeMsgRowOpaqueData = function (binary) {
  return _decodeMsgRowOpaqueData(wrapByteBuffer(binary));
}

function _decodeMsgRowOpaqueData(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional MsgOpaqueData currentMsg = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.currentMsg = _decodeMsgOpaqueData(bb);
        bb.limit = limit;
        break;
      }

      // optional MsgOpaqueData quotedMsg = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.quotedMsg = _decodeMsgOpaqueData(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeNoiseCertificate = function (message) {
  var bb = popByteBuffer();
  _encodeNoiseCertificate(message, bb);
  return toUint8Array(bb);
}

function _encodeNoiseCertificate(message, bb) {
  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $details.length), writeBytes(bb, $details);
  }

  // optional bytes signature = 2;
  var $signature = message.signature;
  if ($signature !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $signature.length), writeBytes(bb, $signature);
  }
};

exports.decodeNoiseCertificate = function (binary) {
  return _decodeNoiseCertificate(wrapByteBuffer(binary));
}

function _decodeNoiseCertificate(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes details = 1;
      case 1: {
        message.details = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes signature = 2;
      case 2: {
        message.signature = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeNotificationMessageInfo = function (message) {
  var bb = popByteBuffer();
  _encodeNotificationMessageInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeNotificationMessageInfo(message, bb) {
  // optional MessageKey key = 1;
  var $key = message.key;
  if ($key !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeMessageKey($key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Message message = 2;
  var $message = message.message;
  if ($message !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeMessage($message, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 messageTimestamp = 3;
  var $messageTimestamp = message.messageTimestamp;
  if ($messageTimestamp !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $messageTimestamp);
  }

  // optional string participant = 4;
  var $participant = message.participant;
  if ($participant !== undefined) {
    writeVarint32(bb, 34);
    writeString(bb, $participant);
  }
};

exports.decodeNotificationMessageInfo = function (binary) {
  return _decodeNotificationMessageInfo(wrapByteBuffer(binary));
}

function _decodeNotificationMessageInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional MessageKey key = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.key = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional Message message = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.message = _decodeMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 messageTimestamp = 3;
      case 3: {
        message.messageTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string participant = 4;
      case 4: {
        message.participant = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeNotificationSettings = function (message) {
  var bb = popByteBuffer();
  _encodeNotificationSettings(message, bb);
  return toUint8Array(bb);
}

function _encodeNotificationSettings(message, bb) {
  // optional string messageVibrate = 1;
  var $messageVibrate = message.messageVibrate;
  if ($messageVibrate !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $messageVibrate);
  }

  // optional string messagePopup = 2;
  var $messagePopup = message.messagePopup;
  if ($messagePopup !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $messagePopup);
  }

  // optional string messageLight = 3;
  var $messageLight = message.messageLight;
  if ($messageLight !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $messageLight);
  }

  // optional bool lowPriorityNotifications = 4;
  var $lowPriorityNotifications = message.lowPriorityNotifications;
  if ($lowPriorityNotifications !== undefined) {
    writeVarint32(bb, 32);
    writeByte(bb, $lowPriorityNotifications ? 1 : 0);
  }

  // optional bool reactionsMuted = 5;
  var $reactionsMuted = message.reactionsMuted;
  if ($reactionsMuted !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $reactionsMuted ? 1 : 0);
  }

  // optional string callVibrate = 6;
  var $callVibrate = message.callVibrate;
  if ($callVibrate !== undefined) {
    writeVarint32(bb, 50);
    writeString(bb, $callVibrate);
  }
};

exports.decodeNotificationSettings = function (binary) {
  return _decodeNotificationSettings(wrapByteBuffer(binary));
}

function _decodeNotificationSettings(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string messageVibrate = 1;
      case 1: {
        message.messageVibrate = readString(bb, readVarint32(bb));
        break;
      }

      // optional string messagePopup = 2;
      case 2: {
        message.messagePopup = readString(bb, readVarint32(bb));
        break;
      }

      // optional string messageLight = 3;
      case 3: {
        message.messageLight = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool lowPriorityNotifications = 4;
      case 4: {
        message.lowPriorityNotifications = !!readByte(bb);
        break;
      }

      // optional bool reactionsMuted = 5;
      case 5: {
        message.reactionsMuted = !!readByte(bb);
        break;
      }

      // optional string callVibrate = 6;
      case 6: {
        message.callVibrate = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePastParticipant = function (message) {
  var bb = popByteBuffer();
  _encodePastParticipant(message, bb);
  return toUint8Array(bb);
}

function _encodePastParticipant(message, bb) {
  // optional string userJid = 1;
  var $userJid = message.userJid;
  if ($userJid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $userJid);
  }

  // optional LeaveReason leaveReason = 2;
  var $leaveReason = message.leaveReason;
  if ($leaveReason !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeLeaveReason($leaveReason, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 leaveTs = 3;
  var $leaveTs = message.leaveTs;
  if ($leaveTs !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $leaveTs);
  }
};

exports.decodePastParticipant = function (binary) {
  return _decodePastParticipant(wrapByteBuffer(binary));
}

function _decodePastParticipant(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string userJid = 1;
      case 1: {
        message.userJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional LeaveReason leaveReason = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.leaveReason = _decodeLeaveReason(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 leaveTs = 3;
      case 3: {
        message.leaveTs = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePastParticipants = function (message) {
  var bb = popByteBuffer();
  _encodePastParticipants(message, bb);
  return toUint8Array(bb);
}

function _encodePastParticipants(message, bb) {
  // optional string groupJid = 1;
  var $groupJid = message.groupJid;
  if ($groupJid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $groupJid);
  }

  // repeated PastParticipant pastParticipants = 2;
  var array$pastParticipants = message.pastParticipants;
  if (array$pastParticipants !== undefined) {
    for (var i = 0; i < array$pastParticipants.length; i++) {
      var value = array$pastParticipants[i];
      writeVarint32(bb, 18);
      var nested = popByteBuffer();
      _encodePastParticipant(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodePastParticipants = function (binary) {
  return _decodePastParticipants(wrapByteBuffer(binary));
}

function _decodePastParticipants(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string groupJid = 1;
      case 1: {
        message.groupJid = readString(bb, readVarint32(bb));
        break;
      }

      // repeated PastParticipant pastParticipants = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        var values = message.pastParticipants || (message.pastParticipants = []);
        values.push(_decodePastParticipant(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePatchDebugData = function (message) {
  var bb = popByteBuffer();
  _encodePatchDebugData(message, bb);
  return toUint8Array(bb);
}

function _encodePatchDebugData(message, bb) {
  // optional bytes currentLthash = 1;
  var $currentLthash = message.currentLthash;
  if ($currentLthash !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $currentLthash.length), writeBytes(bb, $currentLthash);
  }

  // optional bytes newLthash = 2;
  var $newLthash = message.newLthash;
  if ($newLthash !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $newLthash.length), writeBytes(bb, $newLthash);
  }

  // optional bytes patchVersion = 3;
  var $patchVersion = message.patchVersion;
  if ($patchVersion !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $patchVersion.length), writeBytes(bb, $patchVersion);
  }

  // optional bytes collectionName = 4;
  var $collectionName = message.collectionName;
  if ($collectionName !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $collectionName.length), writeBytes(bb, $collectionName);
  }

  // optional bytes firstFourBytesFromAHashOfSnapshotMacKey = 5;
  var $firstFourBytesFromAHashOfSnapshotMacKey = message.firstFourBytesFromAHashOfSnapshotMacKey;
  if ($firstFourBytesFromAHashOfSnapshotMacKey !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $firstFourBytesFromAHashOfSnapshotMacKey.length), writeBytes(bb, $firstFourBytesFromAHashOfSnapshotMacKey);
  }

  // optional bytes newLthashSubtract = 6;
  var $newLthashSubtract = message.newLthashSubtract;
  if ($newLthashSubtract !== undefined) {
    writeVarint32(bb, 50);
    writeVarint32(bb, $newLthashSubtract.length), writeBytes(bb, $newLthashSubtract);
  }

  // optional int32 numberAdd = 7;
  var $numberAdd = message.numberAdd;
  if ($numberAdd !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, intToLong($numberAdd));
  }

  // optional int32 numberRemove = 8;
  var $numberRemove = message.numberRemove;
  if ($numberRemove !== undefined) {
    writeVarint32(bb, 64);
    writeVarint64(bb, intToLong($numberRemove));
  }

  // optional int32 numberOverride = 9;
  var $numberOverride = message.numberOverride;
  if ($numberOverride !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, intToLong($numberOverride));
  }

  // optional Platform senderPlatform = 10;
  var $senderPlatform = message.senderPlatform;
  if ($senderPlatform !== undefined) {
    writeVarint32(bb, 82);
    var nested = popByteBuffer();
    _encodePlatform($senderPlatform, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool isSenderPrimary = 11;
  var $isSenderPrimary = message.isSenderPrimary;
  if ($isSenderPrimary !== undefined) {
    writeVarint32(bb, 88);
    writeByte(bb, $isSenderPrimary ? 1 : 0);
  }
};

exports.decodePatchDebugData = function (binary) {
  return _decodePatchDebugData(wrapByteBuffer(binary));
}

function _decodePatchDebugData(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes currentLthash = 1;
      case 1: {
        message.currentLthash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes newLthash = 2;
      case 2: {
        message.newLthash = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes patchVersion = 3;
      case 3: {
        message.patchVersion = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes collectionName = 4;
      case 4: {
        message.collectionName = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes firstFourBytesFromAHashOfSnapshotMacKey = 5;
      case 5: {
        message.firstFourBytesFromAHashOfSnapshotMacKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes newLthashSubtract = 6;
      case 6: {
        message.newLthashSubtract = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional int32 numberAdd = 7;
      case 7: {
        message.numberAdd = readVarint32(bb);
        break;
      }

      // optional int32 numberRemove = 8;
      case 8: {
        message.numberRemove = readVarint32(bb);
        break;
      }

      // optional int32 numberOverride = 9;
      case 9: {
        message.numberOverride = readVarint32(bb);
        break;
      }

      // optional Platform senderPlatform = 10;
      case 10: {
        var limit = pushTemporaryLength(bb);
        message.senderPlatform = _decodePlatform(bb);
        bb.limit = limit;
        break;
      }

      // optional bool isSenderPrimary = 11;
      case 11: {
        message.isSenderPrimary = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePaymentBackground = function (message) {
  var bb = popByteBuffer();
  _encodePaymentBackground(message, bb);
  return toUint8Array(bb);
}

function _encodePaymentBackground(message, bb) {
  // optional string id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }

  // optional uint64 fileLength = 2;
  var $fileLength = message.fileLength;
  if ($fileLength !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $fileLength);
  }

  // optional uint32 width = 3;
  var $width = message.width;
  if ($width !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $width);
  }

  // optional uint32 height = 4;
  var $height = message.height;
  if ($height !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, $height);
  }

  // optional string mimetype = 5;
  var $mimetype = message.mimetype;
  if ($mimetype !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $mimetype);
  }

  // optional fixed32 placeholderArgb = 6;
  var $placeholderArgb = message.placeholderArgb;
  if ($placeholderArgb !== undefined) {
    writeVarint32(bb, 53);
    writeInt32(bb, $placeholderArgb);
  }

  // optional fixed32 textArgb = 7;
  var $textArgb = message.textArgb;
  if ($textArgb !== undefined) {
    writeVarint32(bb, 61);
    writeInt32(bb, $textArgb);
  }

  // optional fixed32 subtextArgb = 8;
  var $subtextArgb = message.subtextArgb;
  if ($subtextArgb !== undefined) {
    writeVarint32(bb, 69);
    writeInt32(bb, $subtextArgb);
  }

  // optional MediaData mediaData = 9;
  var $mediaData = message.mediaData;
  if ($mediaData !== undefined) {
    writeVarint32(bb, 74);
    var nested = popByteBuffer();
    _encodeMediaData($mediaData, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Type type = 10;
  var $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 82);
    var nested = popByteBuffer();
    _encodeType($type, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodePaymentBackground = function (binary) {
  return _decodePaymentBackground(wrapByteBuffer(binary));
}

function _decodePaymentBackground(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 fileLength = 2;
      case 2: {
        message.fileLength = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint32 width = 3;
      case 3: {
        message.width = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 height = 4;
      case 4: {
        message.height = readVarint32(bb) >>> 0;
        break;
      }

      // optional string mimetype = 5;
      case 5: {
        message.mimetype = readString(bb, readVarint32(bb));
        break;
      }

      // optional fixed32 placeholderArgb = 6;
      case 6: {
        message.placeholderArgb = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 textArgb = 7;
      case 7: {
        message.textArgb = readInt32(bb) >>> 0;
        break;
      }

      // optional fixed32 subtextArgb = 8;
      case 8: {
        message.subtextArgb = readInt32(bb) >>> 0;
        break;
      }

      // optional MediaData mediaData = 9;
      case 9: {
        var limit = pushTemporaryLength(bb);
        message.mediaData = _decodeMediaData(bb);
        bb.limit = limit;
        break;
      }

      // optional Type type = 10;
      case 10: {
        var limit = pushTemporaryLength(bb);
        message.type = _decodeType(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePaymentInfo = function (message) {
  var bb = popByteBuffer();
  _encodePaymentInfo(message, bb);
  return toUint8Array(bb);
}

function _encodePaymentInfo(message, bb) {
  // optional Currency currencyDeprecated = 1;
  var $currencyDeprecated = message.currencyDeprecated;
  if ($currencyDeprecated !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeCurrency($currencyDeprecated, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 amount1000 = 2;
  var $amount1000 = message.amount1000;
  if ($amount1000 !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $amount1000);
  }

  // optional string receiverJid = 3;
  var $receiverJid = message.receiverJid;
  if ($receiverJid !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $receiverJid);
  }

  // optional Status status = 4;
  var $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeStatus($status, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 transactionTimestamp = 5;
  var $transactionTimestamp = message.transactionTimestamp;
  if ($transactionTimestamp !== undefined) {
    writeVarint32(bb, 40);
    writeVarint64(bb, $transactionTimestamp);
  }

  // optional MessageKey requestMessageKey = 6;
  var $requestMessageKey = message.requestMessageKey;
  if ($requestMessageKey !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeMessageKey($requestMessageKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 expiryTimestamp = 7;
  var $expiryTimestamp = message.expiryTimestamp;
  if ($expiryTimestamp !== undefined) {
    writeVarint32(bb, 56);
    writeVarint64(bb, $expiryTimestamp);
  }

  // optional bool futureproofed = 8;
  var $futureproofed = message.futureproofed;
  if ($futureproofed !== undefined) {
    writeVarint32(bb, 64);
    writeByte(bb, $futureproofed ? 1 : 0);
  }

  // optional string currency = 9;
  var $currency = message.currency;
  if ($currency !== undefined) {
    writeVarint32(bb, 74);
    writeString(bb, $currency);
  }

  // optional TxnStatus txnStatus = 10;
  var $txnStatus = message.txnStatus;
  if ($txnStatus !== undefined) {
    writeVarint32(bb, 82);
    var nested = popByteBuffer();
    _encodeTxnStatus($txnStatus, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool useNoviFiatFormat = 11;
  var $useNoviFiatFormat = message.useNoviFiatFormat;
  if ($useNoviFiatFormat !== undefined) {
    writeVarint32(bb, 88);
    writeByte(bb, $useNoviFiatFormat ? 1 : 0);
  }

  // optional Money primaryAmount = 12;
  var $primaryAmount = message.primaryAmount;
  if ($primaryAmount !== undefined) {
    writeVarint32(bb, 98);
    var nested = popByteBuffer();
    _encodeMoney($primaryAmount, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Money exchangeAmount = 13;
  var $exchangeAmount = message.exchangeAmount;
  if ($exchangeAmount !== undefined) {
    writeVarint32(bb, 106);
    var nested = popByteBuffer();
    _encodeMoney($exchangeAmount, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodePaymentInfo = function (binary) {
  return _decodePaymentInfo(wrapByteBuffer(binary));
}

function _decodePaymentInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Currency currencyDeprecated = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.currencyDeprecated = _decodeCurrency(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 amount1000 = 2;
      case 2: {
        message.amount1000 = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional string receiverJid = 3;
      case 3: {
        message.receiverJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional Status status = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.status = _decodeStatus(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 transactionTimestamp = 5;
      case 5: {
        message.transactionTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional MessageKey requestMessageKey = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.requestMessageKey = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 expiryTimestamp = 7;
      case 7: {
        message.expiryTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bool futureproofed = 8;
      case 8: {
        message.futureproofed = !!readByte(bb);
        break;
      }

      // optional string currency = 9;
      case 9: {
        message.currency = readString(bb, readVarint32(bb));
        break;
      }

      // optional TxnStatus txnStatus = 10;
      case 10: {
        var limit = pushTemporaryLength(bb);
        message.txnStatus = _decodeTxnStatus(bb);
        bb.limit = limit;
        break;
      }

      // optional bool useNoviFiatFormat = 11;
      case 11: {
        message.useNoviFiatFormat = !!readByte(bb);
        break;
      }

      // optional Money primaryAmount = 12;
      case 12: {
        var limit = pushTemporaryLength(bb);
        message.primaryAmount = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }

      // optional Money exchangeAmount = 13;
      case 13: {
        var limit = pushTemporaryLength(bb);
        message.exchangeAmount = _decodeMoney(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePhoneNumberToLIDMapping = function (message) {
  var bb = popByteBuffer();
  _encodePhoneNumberToLIDMapping(message, bb);
  return toUint8Array(bb);
}

function _encodePhoneNumberToLIDMapping(message, bb) {
  // optional string pnJid = 1;
  var $pnJid = message.pnJid;
  if ($pnJid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $pnJid);
  }

  // optional string lidJid = 2;
  var $lidJid = message.lidJid;
  if ($lidJid !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $lidJid);
  }
};

exports.decodePhoneNumberToLIDMapping = function (binary) {
  return _decodePhoneNumberToLIDMapping(wrapByteBuffer(binary));
}

function _decodePhoneNumberToLIDMapping(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string pnJid = 1;
      case 1: {
        message.pnJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional string lidJid = 2;
      case 2: {
        message.lidJid = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePhotoChange = function (message) {
  var bb = popByteBuffer();
  _encodePhotoChange(message, bb);
  return toUint8Array(bb);
}

function _encodePhotoChange(message, bb) {
  // optional bytes oldPhoto = 1;
  var $oldPhoto = message.oldPhoto;
  if ($oldPhoto !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $oldPhoto.length), writeBytes(bb, $oldPhoto);
  }

  // optional bytes newPhoto = 2;
  var $newPhoto = message.newPhoto;
  if ($newPhoto !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $newPhoto.length), writeBytes(bb, $newPhoto);
  }

  // optional uint32 newPhotoId = 3;
  var $newPhotoId = message.newPhotoId;
  if ($newPhotoId !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $newPhotoId);
  }
};

exports.decodePhotoChange = function (binary) {
  return _decodePhotoChange(wrapByteBuffer(binary));
}

function _decodePhotoChange(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes oldPhoto = 1;
      case 1: {
        message.oldPhoto = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes newPhoto = 2;
      case 2: {
        message.newPhoto = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 newPhotoId = 3;
      case 3: {
        message.newPhotoId = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePinInChat = function (message) {
  var bb = popByteBuffer();
  _encodePinInChat(message, bb);
  return toUint8Array(bb);
}

function _encodePinInChat(message, bb) {
  // optional Type type = 1;
  var $type = message.type;
  if ($type !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeType($type, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MessageKey key = 2;
  var $key = message.key;
  if ($key !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeMessageKey($key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 senderTimestampMs = 3;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $senderTimestampMs);
  }

  // optional int64 serverTimestampMs = 4;
  var $serverTimestampMs = message.serverTimestampMs;
  if ($serverTimestampMs !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $serverTimestampMs);
  }

  // optional MessageAddOnContextInfo messageAddOnContextInfo = 5;
  var $messageAddOnContextInfo = message.messageAddOnContextInfo;
  if ($messageAddOnContextInfo !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeMessageAddOnContextInfo($messageAddOnContextInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodePinInChat = function (binary) {
  return _decodePinInChat(wrapByteBuffer(binary));
}

function _decodePinInChat(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Type type = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.type = _decodeType(bb);
        bb.limit = limit;
        break;
      }

      // optional MessageKey key = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.key = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional int64 senderTimestampMs = 3;
      case 3: {
        message.senderTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 serverTimestampMs = 4;
      case 4: {
        message.serverTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional MessageAddOnContextInfo messageAddOnContextInfo = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.messageAddOnContextInfo = _decodeMessageAddOnContextInfo(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePoint = function (message) {
  var bb = popByteBuffer();
  _encodePoint(message, bb);
  return toUint8Array(bb);
}

function _encodePoint(message, bb) {
  // optional int32 xDeprecated = 1;
  var $xDeprecated = message.xDeprecated;
  if ($xDeprecated !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, intToLong($xDeprecated));
  }

  // optional int32 yDeprecated = 2;
  var $yDeprecated = message.yDeprecated;
  if ($yDeprecated !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, intToLong($yDeprecated));
  }

  // optional double x = 3;
  var $x = message.x;
  if ($x !== undefined) {
    writeVarint32(bb, 25);
    writeDouble(bb, $x);
  }

  // optional double y = 4;
  var $y = message.y;
  if ($y !== undefined) {
    writeVarint32(bb, 33);
    writeDouble(bb, $y);
  }
};

exports.decodePoint = function (binary) {
  return _decodePoint(wrapByteBuffer(binary));
}

function _decodePoint(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int32 xDeprecated = 1;
      case 1: {
        message.xDeprecated = readVarint32(bb);
        break;
      }

      // optional int32 yDeprecated = 2;
      case 2: {
        message.yDeprecated = readVarint32(bb);
        break;
      }

      // optional double x = 3;
      case 3: {
        message.x = readDouble(bb);
        break;
      }

      // optional double y = 4;
      case 4: {
        message.y = readDouble(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePollAdditionalMetadata = function (message) {
  var bb = popByteBuffer();
  _encodePollAdditionalMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodePollAdditionalMetadata(message, bb) {
  // optional bool pollInvalidated = 1;
  var $pollInvalidated = message.pollInvalidated;
  if ($pollInvalidated !== undefined) {
    writeVarint32(bb, 8);
    writeByte(bb, $pollInvalidated ? 1 : 0);
  }
};

exports.decodePollAdditionalMetadata = function (binary) {
  return _decodePollAdditionalMetadata(wrapByteBuffer(binary));
}

function _decodePollAdditionalMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bool pollInvalidated = 1;
      case 1: {
        message.pollInvalidated = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePollEncValue = function (message) {
  var bb = popByteBuffer();
  _encodePollEncValue(message, bb);
  return toUint8Array(bb);
}

function _encodePollEncValue(message, bb) {
  // optional bytes encPayload = 1;
  var $encPayload = message.encPayload;
  if ($encPayload !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $encPayload.length), writeBytes(bb, $encPayload);
  }

  // optional bytes encIv = 2;
  var $encIv = message.encIv;
  if ($encIv !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $encIv.length), writeBytes(bb, $encIv);
  }
};

exports.decodePollEncValue = function (binary) {
  return _decodePollEncValue(wrapByteBuffer(binary));
}

function _decodePollEncValue(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes encPayload = 1;
      case 1: {
        message.encPayload = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes encIv = 2;
      case 2: {
        message.encIv = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePollUpdate = function (message) {
  var bb = popByteBuffer();
  _encodePollUpdate(message, bb);
  return toUint8Array(bb);
}

function _encodePollUpdate(message, bb) {
  // optional MessageKey pollUpdateMessageKey = 1;
  var $pollUpdateMessageKey = message.pollUpdateMessageKey;
  if ($pollUpdateMessageKey !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeMessageKey($pollUpdateMessageKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Message.PollVoteMessage vote = 2;
  var $vote = message.vote;
  if ($vote !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeMessage.PollVoteMessage($vote, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional int64 senderTimestampMs = 3;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $senderTimestampMs);
  }

  // optional int64 serverTimestampMs = 4;
  var $serverTimestampMs = message.serverTimestampMs;
  if ($serverTimestampMs !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $serverTimestampMs);
  }

  // optional bool unread = 5;
  var $unread = message.unread;
  if ($unread !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $unread ? 1 : 0);
  }
};

exports.decodePollUpdate = function (binary) {
  return _decodePollUpdate(wrapByteBuffer(binary));
}

function _decodePollUpdate(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional MessageKey pollUpdateMessageKey = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.pollUpdateMessageKey = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional Message.PollVoteMessage vote = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.vote = _decodeMessage.PollVoteMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional int64 senderTimestampMs = 3;
      case 3: {
        message.senderTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 serverTimestampMs = 4;
      case 4: {
        message.serverTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool unread = 5;
      case 5: {
        message.unread = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePreKeyRecordStructure = function (message) {
  var bb = popByteBuffer();
  _encodePreKeyRecordStructure(message, bb);
  return toUint8Array(bb);
}

function _encodePreKeyRecordStructure(message, bb) {
  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional bytes publicKey = 2;
  var $publicKey = message.publicKey;
  if ($publicKey !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $publicKey.length), writeBytes(bb, $publicKey);
  }

  // optional bytes privateKey = 3;
  var $privateKey = message.privateKey;
  if ($privateKey !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $privateKey.length), writeBytes(bb, $privateKey);
  }
};

exports.decodePreKeyRecordStructure = function (binary) {
  return _decodePreKeyRecordStructure(wrapByteBuffer(binary));
}

function _decodePreKeyRecordStructure(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes publicKey = 2;
      case 2: {
        message.publicKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes privateKey = 3;
      case 3: {
        message.privateKey = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePreKeySignalMessage = function (message) {
  var bb = popByteBuffer();
  _encodePreKeySignalMessage(message, bb);
  return toUint8Array(bb);
}

function _encodePreKeySignalMessage(message, bb) {
  // optional uint32 registrationId = 5;
  var $registrationId = message.registrationId;
  if ($registrationId !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, $registrationId);
  }

  // optional uint32 preKeyId = 1;
  var $preKeyId = message.preKeyId;
  if ($preKeyId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $preKeyId);
  }

  // optional uint32 signedPreKeyId = 6;
  var $signedPreKeyId = message.signedPreKeyId;
  if ($signedPreKeyId !== undefined) {
    writeVarint32(bb, 48);
    writeVarint32(bb, $signedPreKeyId);
  }

  // optional bytes baseKey = 2;
  var $baseKey = message.baseKey;
  if ($baseKey !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $baseKey.length), writeBytes(bb, $baseKey);
  }

  // optional bytes identityKey = 3;
  var $identityKey = message.identityKey;
  if ($identityKey !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $identityKey.length), writeBytes(bb, $identityKey);
  }

  // optional bytes message = 4;
  var $message = message.message;
  if ($message !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $message.length), writeBytes(bb, $message);
  }
};

exports.decodePreKeySignalMessage = function (binary) {
  return _decodePreKeySignalMessage(wrapByteBuffer(binary));
}

function _decodePreKeySignalMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 registrationId = 5;
      case 5: {
        message.registrationId = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 preKeyId = 1;
      case 1: {
        message.preKeyId = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 signedPreKeyId = 6;
      case 6: {
        message.signedPreKeyId = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes baseKey = 2;
      case 2: {
        message.baseKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes identityKey = 3;
      case 3: {
        message.identityKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes message = 4;
      case 4: {
        message.message = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePremiumMessageInfo = function (message) {
  var bb = popByteBuffer();
  _encodePremiumMessageInfo(message, bb);
  return toUint8Array(bb);
}

function _encodePremiumMessageInfo(message, bb) {
  // optional string serverCampaignId = 1;
  var $serverCampaignId = message.serverCampaignId;
  if ($serverCampaignId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $serverCampaignId);
  }
};

exports.decodePremiumMessageInfo = function (binary) {
  return _decodePremiumMessageInfo(wrapByteBuffer(binary));
}

function _decodePremiumMessageInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string serverCampaignId = 1;
      case 1: {
        message.serverCampaignId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodePushname = function (message) {
  var bb = popByteBuffer();
  _encodePushname(message, bb);
  return toUint8Array(bb);
}

function _encodePushname(message, bb) {
  // optional string id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $id);
  }

  // optional string pushname = 2;
  var $pushname = message.pushname;
  if ($pushname !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $pushname);
  }
};

exports.decodePushname = function (binary) {
  return _decodePushname(wrapByteBuffer(binary));
}

function _decodePushname(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string id = 1;
      case 1: {
        message.id = readString(bb, readVarint32(bb));
        break;
      }

      // optional string pushname = 2;
      case 2: {
        message.pushname = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeQP = function (message) {
  var bb = popByteBuffer();
  _encodeQP(message, bb);
  return toUint8Array(bb);
}

function _encodeQP(message, bb) {
};

exports.decodeQP = function (binary) {
  return _decodeQP(wrapByteBuffer(binary));
}

function _decodeQP(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeReaction = function (message) {
  var bb = popByteBuffer();
  _encodeReaction(message, bb);
  return toUint8Array(bb);
}

function _encodeReaction(message, bb) {
  // optional MessageKey key = 1;
  var $key = message.key;
  if ($key !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeMessageKey($key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string text = 2;
  var $text = message.text;
  if ($text !== undefined) {
    writeVarint32(bb, 18);
    writeString(bb, $text);
  }

  // optional string groupingKey = 3;
  var $groupingKey = message.groupingKey;
  if ($groupingKey !== undefined) {
    writeVarint32(bb, 26);
    writeString(bb, $groupingKey);
  }

  // optional int64 senderTimestampMs = 4;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $senderTimestampMs);
  }

  // optional bool unread = 5;
  var $unread = message.unread;
  if ($unread !== undefined) {
    writeVarint32(bb, 40);
    writeByte(bb, $unread ? 1 : 0);
  }
};

exports.decodeReaction = function (binary) {
  return _decodeReaction(wrapByteBuffer(binary));
}

function _decodeReaction(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional MessageKey key = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.key = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional string text = 2;
      case 2: {
        message.text = readString(bb, readVarint32(bb));
        break;
      }

      // optional string groupingKey = 3;
      case 3: {
        message.groupingKey = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 senderTimestampMs = 4;
      case 4: {
        message.senderTimestampMs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool unread = 5;
      case 5: {
        message.unread = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeRecentEmojiWeight = function (message) {
  var bb = popByteBuffer();
  _encodeRecentEmojiWeight(message, bb);
  return toUint8Array(bb);
}

function _encodeRecentEmojiWeight(message, bb) {
  // optional string emoji = 1;
  var $emoji = message.emoji;
  if ($emoji !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $emoji);
  }

  // optional float weight = 2;
  var $weight = message.weight;
  if ($weight !== undefined) {
    writeVarint32(bb, 21);
    writeFloat(bb, $weight);
  }
};

exports.decodeRecentEmojiWeight = function (binary) {
  return _decodeRecentEmojiWeight(wrapByteBuffer(binary));
}

function _decodeRecentEmojiWeight(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string emoji = 1;
      case 1: {
        message.emoji = readString(bb, readVarint32(bb));
        break;
      }

      // optional float weight = 2;
      case 2: {
        message.weight = readFloat(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeRecordStructure = function (message) {
  var bb = popByteBuffer();
  _encodeRecordStructure(message, bb);
  return toUint8Array(bb);
}

function _encodeRecordStructure(message, bb) {
  // optional SessionStructure currentSession = 1;
  var $currentSession = message.currentSession;
  if ($currentSession !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeSessionStructure($currentSession, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated SessionStructure previousSessions = 2;
  var array$previousSessions = message.previousSessions;
  if (array$previousSessions !== undefined) {
    for (var i = 0; i < array$previousSessions.length; i++) {
      var value = array$previousSessions[i];
      writeVarint32(bb, 18);
      var nested = popByteBuffer();
      _encodeSessionStructure(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodeRecordStructure = function (binary) {
  return _decodeRecordStructure(wrapByteBuffer(binary));
}

function _decodeRecordStructure(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional SessionStructure currentSession = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.currentSession = _decodeSessionStructure(bb);
        bb.limit = limit;
        break;
      }

      // repeated SessionStructure previousSessions = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        var values = message.previousSessions || (message.previousSessions = []);
        values.push(_decodeSessionStructure(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeReportingTokenInfo = function (message) {
  var bb = popByteBuffer();
  _encodeReportingTokenInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeReportingTokenInfo(message, bb) {
  // optional bytes reportingTag = 1;
  var $reportingTag = message.reportingTag;
  if ($reportingTag !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $reportingTag.length), writeBytes(bb, $reportingTag);
  }
};

exports.decodeReportingTokenInfo = function (binary) {
  return _decodeReportingTokenInfo(wrapByteBuffer(binary));
}

function _decodeReportingTokenInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes reportingTag = 1;
      case 1: {
        message.reportingTag = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSenderKeyDistributionMessage = function (message) {
  var bb = popByteBuffer();
  _encodeSenderKeyDistributionMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeSenderKeyDistributionMessage(message, bb) {
  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional uint32 iteration = 2;
  var $iteration = message.iteration;
  if ($iteration !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $iteration);
  }

  // optional bytes chainKey = 3;
  var $chainKey = message.chainKey;
  if ($chainKey !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $chainKey.length), writeBytes(bb, $chainKey);
  }

  // optional bytes signingKey = 4;
  var $signingKey = message.signingKey;
  if ($signingKey !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $signingKey.length), writeBytes(bb, $signingKey);
  }
};

exports.decodeSenderKeyDistributionMessage = function (binary) {
  return _decodeSenderKeyDistributionMessage(wrapByteBuffer(binary));
}

function _decodeSenderKeyDistributionMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 iteration = 2;
      case 2: {
        message.iteration = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes chainKey = 3;
      case 3: {
        message.chainKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes signingKey = 4;
      case 4: {
        message.signingKey = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSenderKeyMessage = function (message) {
  var bb = popByteBuffer();
  _encodeSenderKeyMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeSenderKeyMessage(message, bb) {
  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional uint32 iteration = 2;
  var $iteration = message.iteration;
  if ($iteration !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $iteration);
  }

  // optional bytes ciphertext = 3;
  var $ciphertext = message.ciphertext;
  if ($ciphertext !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $ciphertext.length), writeBytes(bb, $ciphertext);
  }
};

exports.decodeSenderKeyMessage = function (binary) {
  return _decodeSenderKeyMessage(wrapByteBuffer(binary));
}

function _decodeSenderKeyMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 iteration = 2;
      case 2: {
        message.iteration = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes ciphertext = 3;
      case 3: {
        message.ciphertext = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSenderKeyRecordStructure = function (message) {
  var bb = popByteBuffer();
  _encodeSenderKeyRecordStructure(message, bb);
  return toUint8Array(bb);
}

function _encodeSenderKeyRecordStructure(message, bb) {
  // repeated SenderKeyStateStructure senderKeyStates = 1;
  var array$senderKeyStates = message.senderKeyStates;
  if (array$senderKeyStates !== undefined) {
    for (var i = 0; i < array$senderKeyStates.length; i++) {
      var value = array$senderKeyStates[i];
      writeVarint32(bb, 10);
      var nested = popByteBuffer();
      _encodeSenderKeyStateStructure(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodeSenderKeyRecordStructure = function (binary) {
  return _decodeSenderKeyRecordStructure(wrapByteBuffer(binary));
}

function _decodeSenderKeyRecordStructure(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated SenderKeyStateStructure senderKeyStates = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        var values = message.senderKeyStates || (message.senderKeyStates = []);
        values.push(_decodeSenderKeyStateStructure(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSenderKeyStateStructure = function (message) {
  var bb = popByteBuffer();
  _encodeSenderKeyStateStructure(message, bb);
  return toUint8Array(bb);
}

function _encodeSenderKeyStateStructure(message, bb) {
  // optional uint32 senderKeyId = 1;
  var $senderKeyId = message.senderKeyId;
  if ($senderKeyId !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $senderKeyId);
  }

  // optional SenderChainKey senderChainKey = 2;
  var $senderChainKey = message.senderChainKey;
  if ($senderChainKey !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeSenderChainKey($senderChainKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SenderSigningKey senderSigningKey = 3;
  var $senderSigningKey = message.senderSigningKey;
  if ($senderSigningKey !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeSenderSigningKey($senderSigningKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated SenderMessageKey senderMessageKeys = 4;
  var array$senderMessageKeys = message.senderMessageKeys;
  if (array$senderMessageKeys !== undefined) {
    for (var i = 0; i < array$senderMessageKeys.length; i++) {
      var value = array$senderMessageKeys[i];
      writeVarint32(bb, 34);
      var nested = popByteBuffer();
      _encodeSenderMessageKey(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodeSenderKeyStateStructure = function (binary) {
  return _decodeSenderKeyStateStructure(wrapByteBuffer(binary));
}

function _decodeSenderKeyStateStructure(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 senderKeyId = 1;
      case 1: {
        message.senderKeyId = readVarint32(bb) >>> 0;
        break;
      }

      // optional SenderChainKey senderChainKey = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.senderChainKey = _decodeSenderChainKey(bb);
        bb.limit = limit;
        break;
      }

      // optional SenderSigningKey senderSigningKey = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.senderSigningKey = _decodeSenderSigningKey(bb);
        bb.limit = limit;
        break;
      }

      // repeated SenderMessageKey senderMessageKeys = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        var values = message.senderMessageKeys || (message.senderMessageKeys = []);
        values.push(_decodeSenderMessageKey(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeServerErrorReceipt = function (message) {
  var bb = popByteBuffer();
  _encodeServerErrorReceipt(message, bb);
  return toUint8Array(bb);
}

function _encodeServerErrorReceipt(message, bb) {
  // optional string stanzaId = 1;
  var $stanzaId = message.stanzaId;
  if ($stanzaId !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $stanzaId);
  }
};

exports.decodeServerErrorReceipt = function (binary) {
  return _decodeServerErrorReceipt(wrapByteBuffer(binary));
}

function _decodeServerErrorReceipt(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string stanzaId = 1;
      case 1: {
        message.stanzaId = readString(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSessionStructure = function (message) {
  var bb = popByteBuffer();
  _encodeSessionStructure(message, bb);
  return toUint8Array(bb);
}

function _encodeSessionStructure(message, bb) {
  // optional uint32 sessionVersion = 1;
  var $sessionVersion = message.sessionVersion;
  if ($sessionVersion !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $sessionVersion);
  }

  // optional bytes localIdentityPublic = 2;
  var $localIdentityPublic = message.localIdentityPublic;
  if ($localIdentityPublic !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $localIdentityPublic.length), writeBytes(bb, $localIdentityPublic);
  }

  // optional bytes remoteIdentityPublic = 3;
  var $remoteIdentityPublic = message.remoteIdentityPublic;
  if ($remoteIdentityPublic !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $remoteIdentityPublic.length), writeBytes(bb, $remoteIdentityPublic);
  }

  // optional bytes rootKey = 4;
  var $rootKey = message.rootKey;
  if ($rootKey !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $rootKey.length), writeBytes(bb, $rootKey);
  }

  // optional uint32 previousCounter = 5;
  var $previousCounter = message.previousCounter;
  if ($previousCounter !== undefined) {
    writeVarint32(bb, 40);
    writeVarint32(bb, $previousCounter);
  }

  // optional Chain senderChain = 6;
  var $senderChain = message.senderChain;
  if ($senderChain !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeChain($senderChain, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated Chain receiverChains = 7;
  var array$receiverChains = message.receiverChains;
  if (array$receiverChains !== undefined) {
    for (var i = 0; i < array$receiverChains.length; i++) {
      var value = array$receiverChains[i];
      writeVarint32(bb, 58);
      var nested = popByteBuffer();
      _encodeChain(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional PendingKeyExchange pendingKeyExchange = 8;
  var $pendingKeyExchange = message.pendingKeyExchange;
  if ($pendingKeyExchange !== undefined) {
    writeVarint32(bb, 66);
    var nested = popByteBuffer();
    _encodePendingKeyExchange($pendingKeyExchange, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PendingPreKey pendingPreKey = 9;
  var $pendingPreKey = message.pendingPreKey;
  if ($pendingPreKey !== undefined) {
    writeVarint32(bb, 74);
    var nested = popByteBuffer();
    _encodePendingPreKey($pendingPreKey, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint32 remoteRegistrationId = 10;
  var $remoteRegistrationId = message.remoteRegistrationId;
  if ($remoteRegistrationId !== undefined) {
    writeVarint32(bb, 80);
    writeVarint32(bb, $remoteRegistrationId);
  }

  // optional uint32 localRegistrationId = 11;
  var $localRegistrationId = message.localRegistrationId;
  if ($localRegistrationId !== undefined) {
    writeVarint32(bb, 88);
    writeVarint32(bb, $localRegistrationId);
  }

  // optional bool needsRefresh = 12;
  var $needsRefresh = message.needsRefresh;
  if ($needsRefresh !== undefined) {
    writeVarint32(bb, 96);
    writeByte(bb, $needsRefresh ? 1 : 0);
  }

  // optional bytes aliceBaseKey = 13;
  var $aliceBaseKey = message.aliceBaseKey;
  if ($aliceBaseKey !== undefined) {
    writeVarint32(bb, 106);
    writeVarint32(bb, $aliceBaseKey.length), writeBytes(bb, $aliceBaseKey);
  }
};

exports.decodeSessionStructure = function (binary) {
  return _decodeSessionStructure(wrapByteBuffer(binary));
}

function _decodeSessionStructure(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 sessionVersion = 1;
      case 1: {
        message.sessionVersion = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes localIdentityPublic = 2;
      case 2: {
        message.localIdentityPublic = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes remoteIdentityPublic = 3;
      case 3: {
        message.remoteIdentityPublic = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes rootKey = 4;
      case 4: {
        message.rootKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 previousCounter = 5;
      case 5: {
        message.previousCounter = readVarint32(bb) >>> 0;
        break;
      }

      // optional Chain senderChain = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.senderChain = _decodeChain(bb);
        bb.limit = limit;
        break;
      }

      // repeated Chain receiverChains = 7;
      case 7: {
        var limit = pushTemporaryLength(bb);
        var values = message.receiverChains || (message.receiverChains = []);
        values.push(_decodeChain(bb));
        bb.limit = limit;
        break;
      }

      // optional PendingKeyExchange pendingKeyExchange = 8;
      case 8: {
        var limit = pushTemporaryLength(bb);
        message.pendingKeyExchange = _decodePendingKeyExchange(bb);
        bb.limit = limit;
        break;
      }

      // optional PendingPreKey pendingPreKey = 9;
      case 9: {
        var limit = pushTemporaryLength(bb);
        message.pendingPreKey = _decodePendingPreKey(bb);
        bb.limit = limit;
        break;
      }

      // optional uint32 remoteRegistrationId = 10;
      case 10: {
        message.remoteRegistrationId = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 localRegistrationId = 11;
      case 11: {
        message.localRegistrationId = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool needsRefresh = 12;
      case 12: {
        message.needsRefresh = !!readByte(bb);
        break;
      }

      // optional bytes aliceBaseKey = 13;
      case 13: {
        message.aliceBaseKey = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSignalMessage = function (message) {
  var bb = popByteBuffer();
  _encodeSignalMessage(message, bb);
  return toUint8Array(bb);
}

function _encodeSignalMessage(message, bb) {
  // optional bytes ratchetKey = 1;
  var $ratchetKey = message.ratchetKey;
  if ($ratchetKey !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $ratchetKey.length), writeBytes(bb, $ratchetKey);
  }

  // optional uint32 counter = 2;
  var $counter = message.counter;
  if ($counter !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $counter);
  }

  // optional uint32 previousCounter = 3;
  var $previousCounter = message.previousCounter;
  if ($previousCounter !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $previousCounter);
  }

  // optional bytes ciphertext = 4;
  var $ciphertext = message.ciphertext;
  if ($ciphertext !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $ciphertext.length), writeBytes(bb, $ciphertext);
  }
};

exports.decodeSignalMessage = function (binary) {
  return _decodeSignalMessage(wrapByteBuffer(binary));
}

function _decodeSignalMessage(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes ratchetKey = 1;
      case 1: {
        message.ratchetKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional uint32 counter = 2;
      case 2: {
        message.counter = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 previousCounter = 3;
      case 3: {
        message.previousCounter = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes ciphertext = 4;
      case 4: {
        message.ciphertext = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSignedPreKeyRecordStructure = function (message) {
  var bb = popByteBuffer();
  _encodeSignedPreKeyRecordStructure(message, bb);
  return toUint8Array(bb);
}

function _encodeSignedPreKeyRecordStructure(message, bb) {
  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    writeVarint32(bb, 8);
    writeVarint32(bb, $id);
  }

  // optional bytes publicKey = 2;
  var $publicKey = message.publicKey;
  if ($publicKey !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $publicKey.length), writeBytes(bb, $publicKey);
  }

  // optional bytes privateKey = 3;
  var $privateKey = message.privateKey;
  if ($privateKey !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $privateKey.length), writeBytes(bb, $privateKey);
  }

  // optional bytes signature = 4;
  var $signature = message.signature;
  if ($signature !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $signature.length), writeBytes(bb, $signature);
  }

  // optional fixed64 timestamp = 5;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 41);
    writeInt64(bb, $timestamp);
  }
};

exports.decodeSignedPreKeyRecordStructure = function (binary) {
  return _decodeSignedPreKeyRecordStructure(wrapByteBuffer(binary));
}

function _decodeSignedPreKeyRecordStructure(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 id = 1;
      case 1: {
        message.id = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes publicKey = 2;
      case 2: {
        message.publicKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes privateKey = 3;
      case 3: {
        message.privateKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes signature = 4;
      case 4: {
        message.signature = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional fixed64 timestamp = 5;
      case 5: {
        message.timestamp = readInt64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeStatusPSA = function (message) {
  var bb = popByteBuffer();
  _encodeStatusPSA(message, bb);
  return toUint8Array(bb);
}

function _encodeStatusPSA(message, bb) {
  // required uint64 campaignId = 44;
  var $campaignId = message.campaignId;
  if ($campaignId !== undefined) {
    writeVarint32(bb, 352);
    writeVarint64(bb, $campaignId);
  }

  // optional uint64 campaignExpirationTimestamp = 45;
  var $campaignExpirationTimestamp = message.campaignExpirationTimestamp;
  if ($campaignExpirationTimestamp !== undefined) {
    writeVarint32(bb, 360);
    writeVarint64(bb, $campaignExpirationTimestamp);
  }
};

exports.decodeStatusPSA = function (binary) {
  return _decodeStatusPSA(wrapByteBuffer(binary));
}

function _decodeStatusPSA(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required uint64 campaignId = 44;
      case 44: {
        message.campaignId = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint64 campaignExpirationTimestamp = 45;
      case 45: {
        message.campaignExpirationTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.campaignId === undefined)
    throw new Error("Missing required field: campaignId");

  return message;
};

exports.encodeStickerMetadata = function (message) {
  var bb = popByteBuffer();
  _encodeStickerMetadata(message, bb);
  return toUint8Array(bb);
}

function _encodeStickerMetadata(message, bb) {
  // optional string url = 1;
  var $url = message.url;
  if ($url !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $url);
  }

  // optional bytes fileSha256 = 2;
  var $fileSha256 = message.fileSha256;
  if ($fileSha256 !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $fileSha256.length), writeBytes(bb, $fileSha256);
  }

  // optional bytes fileEncSha256 = 3;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $fileEncSha256.length), writeBytes(bb, $fileEncSha256);
  }

  // optional bytes mediaKey = 4;
  var $mediaKey = message.mediaKey;
  if ($mediaKey !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $mediaKey.length), writeBytes(bb, $mediaKey);
  }

  // optional string mimetype = 5;
  var $mimetype = message.mimetype;
  if ($mimetype !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $mimetype);
  }

  // optional uint32 height = 6;
  var $height = message.height;
  if ($height !== undefined) {
    writeVarint32(bb, 48);
    writeVarint32(bb, $height);
  }

  // optional uint32 width = 7;
  var $width = message.width;
  if ($width !== undefined) {
    writeVarint32(bb, 56);
    writeVarint32(bb, $width);
  }

  // optional string directPath = 8;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    writeVarint32(bb, 66);
    writeString(bb, $directPath);
  }

  // optional uint64 fileLength = 9;
  var $fileLength = message.fileLength;
  if ($fileLength !== undefined) {
    writeVarint32(bb, 72);
    writeVarint64(bb, $fileLength);
  }

  // optional float weight = 10;
  var $weight = message.weight;
  if ($weight !== undefined) {
    writeVarint32(bb, 85);
    writeFloat(bb, $weight);
  }

  // optional int64 lastStickerSentTs = 11;
  var $lastStickerSentTs = message.lastStickerSentTs;
  if ($lastStickerSentTs !== undefined) {
    writeVarint32(bb, 88);
    writeVarint64(bb, $lastStickerSentTs);
  }

  // optional bool isLottie = 12;
  var $isLottie = message.isLottie;
  if ($isLottie !== undefined) {
    writeVarint32(bb, 96);
    writeByte(bb, $isLottie ? 1 : 0);
  }
};

exports.decodeStickerMetadata = function (binary) {
  return _decodeStickerMetadata(wrapByteBuffer(binary));
}

function _decodeStickerMetadata(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string url = 1;
      case 1: {
        message.url = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes fileSha256 = 2;
      case 2: {
        message.fileSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes fileEncSha256 = 3;
      case 3: {
        message.fileEncSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes mediaKey = 4;
      case 4: {
        message.mediaKey = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional string mimetype = 5;
      case 5: {
        message.mimetype = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 height = 6;
      case 6: {
        message.height = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 width = 7;
      case 7: {
        message.width = readVarint32(bb) >>> 0;
        break;
      }

      // optional string directPath = 8;
      case 8: {
        message.directPath = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 fileLength = 9;
      case 9: {
        message.fileLength = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional float weight = 10;
      case 10: {
        message.weight = readFloat(bb);
        break;
      }

      // optional int64 lastStickerSentTs = 11;
      case 11: {
        message.lastStickerSentTs = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional bool isLottie = 12;
      case 12: {
        message.isLottie = !!readByte(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncActionData = function (message) {
  var bb = popByteBuffer();
  _encodeSyncActionData(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncActionData(message, bb) {
  // optional bytes index = 1;
  var $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $index.length), writeBytes(bb, $index);
  }

  // optional SyncActionValue value = 2;
  var $value = message.value;
  if ($value !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeSyncActionValue($value, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes padding = 3;
  var $padding = message.padding;
  if ($padding !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $padding.length), writeBytes(bb, $padding);
  }

  // optional int32 version = 4;
  var $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, intToLong($version));
  }
};

exports.decodeSyncActionData = function (binary) {
  return _decodeSyncActionData(wrapByteBuffer(binary));
}

function _decodeSyncActionData(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes index = 1;
      case 1: {
        message.index = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional SyncActionValue value = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.value = _decodeSyncActionValue(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes padding = 3;
      case 3: {
        message.padding = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional int32 version = 4;
      case 4: {
        message.version = readVarint32(bb);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncActionValue = function (message) {
  var bb = popByteBuffer();
  _encodeSyncActionValue(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncActionValue(message, bb) {
  // optional int64 timestamp = 1;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $timestamp);
  }

  // optional StarAction starAction = 2;
  var $starAction = message.starAction;
  if ($starAction !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeStarAction($starAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ContactAction contactAction = 3;
  var $contactAction = message.contactAction;
  if ($contactAction !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeContactAction($contactAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MuteAction muteAction = 4;
  var $muteAction = message.muteAction;
  if ($muteAction !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeMuteAction($muteAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PinAction pinAction = 5;
  var $pinAction = message.pinAction;
  if ($pinAction !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodePinAction($pinAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SecurityNotificationSetting securityNotificationSetting = 6;
  var $securityNotificationSetting = message.securityNotificationSetting;
  if ($securityNotificationSetting !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeSecurityNotificationSetting($securityNotificationSetting, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PushNameSetting pushNameSetting = 7;
  var $pushNameSetting = message.pushNameSetting;
  if ($pushNameSetting !== undefined) {
    writeVarint32(bb, 58);
    var nested = popByteBuffer();
    _encodePushNameSetting($pushNameSetting, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional QuickReplyAction quickReplyAction = 8;
  var $quickReplyAction = message.quickReplyAction;
  if ($quickReplyAction !== undefined) {
    writeVarint32(bb, 66);
    var nested = popByteBuffer();
    _encodeQuickReplyAction($quickReplyAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RecentEmojiWeightsAction recentEmojiWeightsAction = 11;
  var $recentEmojiWeightsAction = message.recentEmojiWeightsAction;
  if ($recentEmojiWeightsAction !== undefined) {
    writeVarint32(bb, 90);
    var nested = popByteBuffer();
    _encodeRecentEmojiWeightsAction($recentEmojiWeightsAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LabelEditAction labelEditAction = 14;
  var $labelEditAction = message.labelEditAction;
  if ($labelEditAction !== undefined) {
    writeVarint32(bb, 114);
    var nested = popByteBuffer();
    _encodeLabelEditAction($labelEditAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LabelAssociationAction labelAssociationAction = 15;
  var $labelAssociationAction = message.labelAssociationAction;
  if ($labelAssociationAction !== undefined) {
    writeVarint32(bb, 122);
    var nested = popByteBuffer();
    _encodeLabelAssociationAction($labelAssociationAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LocaleSetting localeSetting = 16;
  var $localeSetting = message.localeSetting;
  if ($localeSetting !== undefined) {
    writeVarint32(bb, 130);
    var nested = popByteBuffer();
    _encodeLocaleSetting($localeSetting, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ArchiveChatAction archiveChatAction = 17;
  var $archiveChatAction = message.archiveChatAction;
  if ($archiveChatAction !== undefined) {
    writeVarint32(bb, 138);
    var nested = popByteBuffer();
    _encodeArchiveChatAction($archiveChatAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DeleteMessageForMeAction deleteMessageForMeAction = 18;
  var $deleteMessageForMeAction = message.deleteMessageForMeAction;
  if ($deleteMessageForMeAction !== undefined) {
    writeVarint32(bb, 146);
    var nested = popByteBuffer();
    _encodeDeleteMessageForMeAction($deleteMessageForMeAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional KeyExpiration keyExpiration = 19;
  var $keyExpiration = message.keyExpiration;
  if ($keyExpiration !== undefined) {
    writeVarint32(bb, 154);
    var nested = popByteBuffer();
    _encodeKeyExpiration($keyExpiration, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MarkChatAsReadAction markChatAsReadAction = 20;
  var $markChatAsReadAction = message.markChatAsReadAction;
  if ($markChatAsReadAction !== undefined) {
    writeVarint32(bb, 162);
    var nested = popByteBuffer();
    _encodeMarkChatAsReadAction($markChatAsReadAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ClearChatAction clearChatAction = 21;
  var $clearChatAction = message.clearChatAction;
  if ($clearChatAction !== undefined) {
    writeVarint32(bb, 170);
    var nested = popByteBuffer();
    _encodeClearChatAction($clearChatAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DeleteChatAction deleteChatAction = 22;
  var $deleteChatAction = message.deleteChatAction;
  if ($deleteChatAction !== undefined) {
    writeVarint32(bb, 178);
    var nested = popByteBuffer();
    _encodeDeleteChatAction($deleteChatAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional UnarchiveChatsSetting unarchiveChatsSetting = 23;
  var $unarchiveChatsSetting = message.unarchiveChatsSetting;
  if ($unarchiveChatsSetting !== undefined) {
    writeVarint32(bb, 186);
    var nested = popByteBuffer();
    _encodeUnarchiveChatsSetting($unarchiveChatsSetting, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PrimaryFeature primaryFeature = 24;
  var $primaryFeature = message.primaryFeature;
  if ($primaryFeature !== undefined) {
    writeVarint32(bb, 194);
    var nested = popByteBuffer();
    _encodePrimaryFeature($primaryFeature, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AndroidUnsupportedActions androidUnsupportedActions = 26;
  var $androidUnsupportedActions = message.androidUnsupportedActions;
  if ($androidUnsupportedActions !== undefined) {
    writeVarint32(bb, 210);
    var nested = popByteBuffer();
    _encodeAndroidUnsupportedActions($androidUnsupportedActions, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional AgentAction agentAction = 27;
  var $agentAction = message.agentAction;
  if ($agentAction !== undefined) {
    writeVarint32(bb, 218);
    var nested = popByteBuffer();
    _encodeAgentAction($agentAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SubscriptionAction subscriptionAction = 28;
  var $subscriptionAction = message.subscriptionAction;
  if ($subscriptionAction !== undefined) {
    writeVarint32(bb, 226);
    var nested = popByteBuffer();
    _encodeSubscriptionAction($subscriptionAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional UserStatusMuteAction userStatusMuteAction = 29;
  var $userStatusMuteAction = message.userStatusMuteAction;
  if ($userStatusMuteAction !== undefined) {
    writeVarint32(bb, 234);
    var nested = popByteBuffer();
    _encodeUserStatusMuteAction($userStatusMuteAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TimeFormatAction timeFormatAction = 30;
  var $timeFormatAction = message.timeFormatAction;
  if ($timeFormatAction !== undefined) {
    writeVarint32(bb, 242);
    var nested = popByteBuffer();
    _encodeTimeFormatAction($timeFormatAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional NuxAction nuxAction = 31;
  var $nuxAction = message.nuxAction;
  if ($nuxAction !== undefined) {
    writeVarint32(bb, 250);
    var nested = popByteBuffer();
    _encodeNuxAction($nuxAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PrimaryVersionAction primaryVersionAction = 32;
  var $primaryVersionAction = message.primaryVersionAction;
  if ($primaryVersionAction !== undefined) {
    writeVarint32(bb, 258);
    var nested = popByteBuffer();
    _encodePrimaryVersionAction($primaryVersionAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional StickerAction stickerAction = 33;
  var $stickerAction = message.stickerAction;
  if ($stickerAction !== undefined) {
    writeVarint32(bb, 266);
    var nested = popByteBuffer();
    _encodeStickerAction($stickerAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional RemoveRecentStickerAction removeRecentStickerAction = 34;
  var $removeRecentStickerAction = message.removeRecentStickerAction;
  if ($removeRecentStickerAction !== undefined) {
    writeVarint32(bb, 274);
    var nested = popByteBuffer();
    _encodeRemoveRecentStickerAction($removeRecentStickerAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ChatAssignmentAction chatAssignment = 35;
  var $chatAssignment = message.chatAssignment;
  if ($chatAssignment !== undefined) {
    writeVarint32(bb, 282);
    var nested = popByteBuffer();
    _encodeChatAssignmentAction($chatAssignment, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ChatAssignmentOpenedStatusAction chatAssignmentOpenedStatus = 36;
  var $chatAssignmentOpenedStatus = message.chatAssignmentOpenedStatus;
  if ($chatAssignmentOpenedStatus !== undefined) {
    writeVarint32(bb, 290);
    var nested = popByteBuffer();
    _encodeChatAssignmentOpenedStatusAction($chatAssignmentOpenedStatus, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PnForLidChatAction pnForLidChatAction = 37;
  var $pnForLidChatAction = message.pnForLidChatAction;
  if ($pnForLidChatAction !== undefined) {
    writeVarint32(bb, 298);
    var nested = popByteBuffer();
    _encodePnForLidChatAction($pnForLidChatAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MarketingMessageAction marketingMessageAction = 38;
  var $marketingMessageAction = message.marketingMessageAction;
  if ($marketingMessageAction !== undefined) {
    writeVarint32(bb, 306);
    var nested = popByteBuffer();
    _encodeMarketingMessageAction($marketingMessageAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional MarketingMessageBroadcastAction marketingMessageBroadcastAction = 39;
  var $marketingMessageBroadcastAction = message.marketingMessageBroadcastAction;
  if ($marketingMessageBroadcastAction !== undefined) {
    writeVarint32(bb, 314);
    var nested = popByteBuffer();
    _encodeMarketingMessageBroadcastAction($marketingMessageBroadcastAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ExternalWebBetaAction externalWebBetaAction = 40;
  var $externalWebBetaAction = message.externalWebBetaAction;
  if ($externalWebBetaAction !== undefined) {
    writeVarint32(bb, 322);
    var nested = popByteBuffer();
    _encodeExternalWebBetaAction($externalWebBetaAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PrivacySettingRelayAllCalls privacySettingRelayAllCalls = 41;
  var $privacySettingRelayAllCalls = message.privacySettingRelayAllCalls;
  if ($privacySettingRelayAllCalls !== undefined) {
    writeVarint32(bb, 330);
    var nested = popByteBuffer();
    _encodePrivacySettingRelayAllCalls($privacySettingRelayAllCalls, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional CallLogAction callLogAction = 42;
  var $callLogAction = message.callLogAction;
  if ($callLogAction !== undefined) {
    writeVarint32(bb, 338);
    var nested = popByteBuffer();
    _encodeCallLogAction($callLogAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional StatusPrivacyAction statusPrivacy = 44;
  var $statusPrivacy = message.statusPrivacy;
  if ($statusPrivacy !== undefined) {
    writeVarint32(bb, 354);
    var nested = popByteBuffer();
    _encodeStatusPrivacyAction($statusPrivacy, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional BotWelcomeRequestAction botWelcomeRequestAction = 45;
  var $botWelcomeRequestAction = message.botWelcomeRequestAction;
  if ($botWelcomeRequestAction !== undefined) {
    writeVarint32(bb, 362);
    var nested = popByteBuffer();
    _encodeBotWelcomeRequestAction($botWelcomeRequestAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DeleteIndividualCallLogAction deleteIndividualCallLog = 46;
  var $deleteIndividualCallLog = message.deleteIndividualCallLog;
  if ($deleteIndividualCallLog !== undefined) {
    writeVarint32(bb, 370);
    var nested = popByteBuffer();
    _encodeDeleteIndividualCallLogAction($deleteIndividualCallLog, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LabelReorderingAction labelReorderingAction = 47;
  var $labelReorderingAction = message.labelReorderingAction;
  if ($labelReorderingAction !== undefined) {
    writeVarint32(bb, 378);
    var nested = popByteBuffer();
    _encodeLabelReorderingAction($labelReorderingAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PaymentInfoAction paymentInfoAction = 48;
  var $paymentInfoAction = message.paymentInfoAction;
  if ($paymentInfoAction !== undefined) {
    writeVarint32(bb, 386);
    var nested = popByteBuffer();
    _encodePaymentInfoAction($paymentInfoAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional CustomPaymentMethodsAction customPaymentMethodsAction = 49;
  var $customPaymentMethodsAction = message.customPaymentMethodsAction;
  if ($customPaymentMethodsAction !== undefined) {
    writeVarint32(bb, 394);
    var nested = popByteBuffer();
    _encodeCustomPaymentMethodsAction($customPaymentMethodsAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional LockChatAction lockChatAction = 50;
  var $lockChatAction = message.lockChatAction;
  if ($lockChatAction !== undefined) {
    writeVarint32(bb, 402);
    var nested = popByteBuffer();
    _encodeLockChatAction($lockChatAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ChatLockSettings chatLockSettings = 51;
  var $chatLockSettings = message.chatLockSettings;
  if ($chatLockSettings !== undefined) {
    writeVarint32(bb, 410);
    var nested = popByteBuffer();
    _encodeChatLockSettings($chatLockSettings, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional WamoUserIdentifierAction wamoUserIdentifierAction = 52;
  var $wamoUserIdentifierAction = message.wamoUserIdentifierAction;
  if ($wamoUserIdentifierAction !== undefined) {
    writeVarint32(bb, 418);
    var nested = popByteBuffer();
    _encodeWamoUserIdentifierAction($wamoUserIdentifierAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PrivacySettingDisableLinkPreviewsAction privacySettingDisableLinkPreviewsAction = 53;
  var $privacySettingDisableLinkPreviewsAction = message.privacySettingDisableLinkPreviewsAction;
  if ($privacySettingDisableLinkPreviewsAction !== undefined) {
    writeVarint32(bb, 426);
    var nested = popByteBuffer();
    _encodePrivacySettingDisableLinkPreviewsAction($privacySettingDisableLinkPreviewsAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional DeviceCapabilities deviceCapabilities = 54;
  var $deviceCapabilities = message.deviceCapabilities;
  if ($deviceCapabilities !== undefined) {
    writeVarint32(bb, 434);
    var nested = popByteBuffer();
    _encodeDeviceCapabilities($deviceCapabilities, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional NoteEditAction noteEditAction = 55;
  var $noteEditAction = message.noteEditAction;
  if ($noteEditAction !== undefined) {
    writeVarint32(bb, 442);
    var nested = popByteBuffer();
    _encodeNoteEditAction($noteEditAction, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeSyncActionValue = function (binary) {
  return _decodeSyncActionValue(wrapByteBuffer(binary));
}

function _decodeSyncActionValue(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional int64 timestamp = 1;
      case 1: {
        message.timestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional StarAction starAction = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.starAction = _decodeStarAction(bb);
        bb.limit = limit;
        break;
      }

      // optional ContactAction contactAction = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.contactAction = _decodeContactAction(bb);
        bb.limit = limit;
        break;
      }

      // optional MuteAction muteAction = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.muteAction = _decodeMuteAction(bb);
        bb.limit = limit;
        break;
      }

      // optional PinAction pinAction = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.pinAction = _decodePinAction(bb);
        bb.limit = limit;
        break;
      }

      // optional SecurityNotificationSetting securityNotificationSetting = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.securityNotificationSetting = _decodeSecurityNotificationSetting(bb);
        bb.limit = limit;
        break;
      }

      // optional PushNameSetting pushNameSetting = 7;
      case 7: {
        var limit = pushTemporaryLength(bb);
        message.pushNameSetting = _decodePushNameSetting(bb);
        bb.limit = limit;
        break;
      }

      // optional QuickReplyAction quickReplyAction = 8;
      case 8: {
        var limit = pushTemporaryLength(bb);
        message.quickReplyAction = _decodeQuickReplyAction(bb);
        bb.limit = limit;
        break;
      }

      // optional RecentEmojiWeightsAction recentEmojiWeightsAction = 11;
      case 11: {
        var limit = pushTemporaryLength(bb);
        message.recentEmojiWeightsAction = _decodeRecentEmojiWeightsAction(bb);
        bb.limit = limit;
        break;
      }

      // optional LabelEditAction labelEditAction = 14;
      case 14: {
        var limit = pushTemporaryLength(bb);
        message.labelEditAction = _decodeLabelEditAction(bb);
        bb.limit = limit;
        break;
      }

      // optional LabelAssociationAction labelAssociationAction = 15;
      case 15: {
        var limit = pushTemporaryLength(bb);
        message.labelAssociationAction = _decodeLabelAssociationAction(bb);
        bb.limit = limit;
        break;
      }

      // optional LocaleSetting localeSetting = 16;
      case 16: {
        var limit = pushTemporaryLength(bb);
        message.localeSetting = _decodeLocaleSetting(bb);
        bb.limit = limit;
        break;
      }

      // optional ArchiveChatAction archiveChatAction = 17;
      case 17: {
        var limit = pushTemporaryLength(bb);
        message.archiveChatAction = _decodeArchiveChatAction(bb);
        bb.limit = limit;
        break;
      }

      // optional DeleteMessageForMeAction deleteMessageForMeAction = 18;
      case 18: {
        var limit = pushTemporaryLength(bb);
        message.deleteMessageForMeAction = _decodeDeleteMessageForMeAction(bb);
        bb.limit = limit;
        break;
      }

      // optional KeyExpiration keyExpiration = 19;
      case 19: {
        var limit = pushTemporaryLength(bb);
        message.keyExpiration = _decodeKeyExpiration(bb);
        bb.limit = limit;
        break;
      }

      // optional MarkChatAsReadAction markChatAsReadAction = 20;
      case 20: {
        var limit = pushTemporaryLength(bb);
        message.markChatAsReadAction = _decodeMarkChatAsReadAction(bb);
        bb.limit = limit;
        break;
      }

      // optional ClearChatAction clearChatAction = 21;
      case 21: {
        var limit = pushTemporaryLength(bb);
        message.clearChatAction = _decodeClearChatAction(bb);
        bb.limit = limit;
        break;
      }

      // optional DeleteChatAction deleteChatAction = 22;
      case 22: {
        var limit = pushTemporaryLength(bb);
        message.deleteChatAction = _decodeDeleteChatAction(bb);
        bb.limit = limit;
        break;
      }

      // optional UnarchiveChatsSetting unarchiveChatsSetting = 23;
      case 23: {
        var limit = pushTemporaryLength(bb);
        message.unarchiveChatsSetting = _decodeUnarchiveChatsSetting(bb);
        bb.limit = limit;
        break;
      }

      // optional PrimaryFeature primaryFeature = 24;
      case 24: {
        var limit = pushTemporaryLength(bb);
        message.primaryFeature = _decodePrimaryFeature(bb);
        bb.limit = limit;
        break;
      }

      // optional AndroidUnsupportedActions androidUnsupportedActions = 26;
      case 26: {
        var limit = pushTemporaryLength(bb);
        message.androidUnsupportedActions = _decodeAndroidUnsupportedActions(bb);
        bb.limit = limit;
        break;
      }

      // optional AgentAction agentAction = 27;
      case 27: {
        var limit = pushTemporaryLength(bb);
        message.agentAction = _decodeAgentAction(bb);
        bb.limit = limit;
        break;
      }

      // optional SubscriptionAction subscriptionAction = 28;
      case 28: {
        var limit = pushTemporaryLength(bb);
        message.subscriptionAction = _decodeSubscriptionAction(bb);
        bb.limit = limit;
        break;
      }

      // optional UserStatusMuteAction userStatusMuteAction = 29;
      case 29: {
        var limit = pushTemporaryLength(bb);
        message.userStatusMuteAction = _decodeUserStatusMuteAction(bb);
        bb.limit = limit;
        break;
      }

      // optional TimeFormatAction timeFormatAction = 30;
      case 30: {
        var limit = pushTemporaryLength(bb);
        message.timeFormatAction = _decodeTimeFormatAction(bb);
        bb.limit = limit;
        break;
      }

      // optional NuxAction nuxAction = 31;
      case 31: {
        var limit = pushTemporaryLength(bb);
        message.nuxAction = _decodeNuxAction(bb);
        bb.limit = limit;
        break;
      }

      // optional PrimaryVersionAction primaryVersionAction = 32;
      case 32: {
        var limit = pushTemporaryLength(bb);
        message.primaryVersionAction = _decodePrimaryVersionAction(bb);
        bb.limit = limit;
        break;
      }

      // optional StickerAction stickerAction = 33;
      case 33: {
        var limit = pushTemporaryLength(bb);
        message.stickerAction = _decodeStickerAction(bb);
        bb.limit = limit;
        break;
      }

      // optional RemoveRecentStickerAction removeRecentStickerAction = 34;
      case 34: {
        var limit = pushTemporaryLength(bb);
        message.removeRecentStickerAction = _decodeRemoveRecentStickerAction(bb);
        bb.limit = limit;
        break;
      }

      // optional ChatAssignmentAction chatAssignment = 35;
      case 35: {
        var limit = pushTemporaryLength(bb);
        message.chatAssignment = _decodeChatAssignmentAction(bb);
        bb.limit = limit;
        break;
      }

      // optional ChatAssignmentOpenedStatusAction chatAssignmentOpenedStatus = 36;
      case 36: {
        var limit = pushTemporaryLength(bb);
        message.chatAssignmentOpenedStatus = _decodeChatAssignmentOpenedStatusAction(bb);
        bb.limit = limit;
        break;
      }

      // optional PnForLidChatAction pnForLidChatAction = 37;
      case 37: {
        var limit = pushTemporaryLength(bb);
        message.pnForLidChatAction = _decodePnForLidChatAction(bb);
        bb.limit = limit;
        break;
      }

      // optional MarketingMessageAction marketingMessageAction = 38;
      case 38: {
        var limit = pushTemporaryLength(bb);
        message.marketingMessageAction = _decodeMarketingMessageAction(bb);
        bb.limit = limit;
        break;
      }

      // optional MarketingMessageBroadcastAction marketingMessageBroadcastAction = 39;
      case 39: {
        var limit = pushTemporaryLength(bb);
        message.marketingMessageBroadcastAction = _decodeMarketingMessageBroadcastAction(bb);
        bb.limit = limit;
        break;
      }

      // optional ExternalWebBetaAction externalWebBetaAction = 40;
      case 40: {
        var limit = pushTemporaryLength(bb);
        message.externalWebBetaAction = _decodeExternalWebBetaAction(bb);
        bb.limit = limit;
        break;
      }

      // optional PrivacySettingRelayAllCalls privacySettingRelayAllCalls = 41;
      case 41: {
        var limit = pushTemporaryLength(bb);
        message.privacySettingRelayAllCalls = _decodePrivacySettingRelayAllCalls(bb);
        bb.limit = limit;
        break;
      }

      // optional CallLogAction callLogAction = 42;
      case 42: {
        var limit = pushTemporaryLength(bb);
        message.callLogAction = _decodeCallLogAction(bb);
        bb.limit = limit;
        break;
      }

      // optional StatusPrivacyAction statusPrivacy = 44;
      case 44: {
        var limit = pushTemporaryLength(bb);
        message.statusPrivacy = _decodeStatusPrivacyAction(bb);
        bb.limit = limit;
        break;
      }

      // optional BotWelcomeRequestAction botWelcomeRequestAction = 45;
      case 45: {
        var limit = pushTemporaryLength(bb);
        message.botWelcomeRequestAction = _decodeBotWelcomeRequestAction(bb);
        bb.limit = limit;
        break;
      }

      // optional DeleteIndividualCallLogAction deleteIndividualCallLog = 46;
      case 46: {
        var limit = pushTemporaryLength(bb);
        message.deleteIndividualCallLog = _decodeDeleteIndividualCallLogAction(bb);
        bb.limit = limit;
        break;
      }

      // optional LabelReorderingAction labelReorderingAction = 47;
      case 47: {
        var limit = pushTemporaryLength(bb);
        message.labelReorderingAction = _decodeLabelReorderingAction(bb);
        bb.limit = limit;
        break;
      }

      // optional PaymentInfoAction paymentInfoAction = 48;
      case 48: {
        var limit = pushTemporaryLength(bb);
        message.paymentInfoAction = _decodePaymentInfoAction(bb);
        bb.limit = limit;
        break;
      }

      // optional CustomPaymentMethodsAction customPaymentMethodsAction = 49;
      case 49: {
        var limit = pushTemporaryLength(bb);
        message.customPaymentMethodsAction = _decodeCustomPaymentMethodsAction(bb);
        bb.limit = limit;
        break;
      }

      // optional LockChatAction lockChatAction = 50;
      case 50: {
        var limit = pushTemporaryLength(bb);
        message.lockChatAction = _decodeLockChatAction(bb);
        bb.limit = limit;
        break;
      }

      // optional ChatLockSettings chatLockSettings = 51;
      case 51: {
        var limit = pushTemporaryLength(bb);
        message.chatLockSettings = _decodeChatLockSettings(bb);
        bb.limit = limit;
        break;
      }

      // optional WamoUserIdentifierAction wamoUserIdentifierAction = 52;
      case 52: {
        var limit = pushTemporaryLength(bb);
        message.wamoUserIdentifierAction = _decodeWamoUserIdentifierAction(bb);
        bb.limit = limit;
        break;
      }

      // optional PrivacySettingDisableLinkPreviewsAction privacySettingDisableLinkPreviewsAction = 53;
      case 53: {
        var limit = pushTemporaryLength(bb);
        message.privacySettingDisableLinkPreviewsAction = _decodePrivacySettingDisableLinkPreviewsAction(bb);
        bb.limit = limit;
        break;
      }

      // optional DeviceCapabilities deviceCapabilities = 54;
      case 54: {
        var limit = pushTemporaryLength(bb);
        message.deviceCapabilities = _decodeDeviceCapabilities(bb);
        bb.limit = limit;
        break;
      }

      // optional NoteEditAction noteEditAction = 55;
      case 55: {
        var limit = pushTemporaryLength(bb);
        message.noteEditAction = _decodeNoteEditAction(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdIndex = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdIndex(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdIndex(message, bb) {
  // optional bytes blob = 1;
  var $blob = message.blob;
  if ($blob !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $blob.length), writeBytes(bb, $blob);
  }
};

exports.decodeSyncdIndex = function (binary) {
  return _decodeSyncdIndex(wrapByteBuffer(binary));
}

function _decodeSyncdIndex(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes blob = 1;
      case 1: {
        message.blob = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdMutation = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdMutation(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdMutation(message, bb) {
  // optional SyncdOperation operation = 1;
  var $operation = message.operation;
  if ($operation !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeSyncdOperation($operation, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SyncdRecord record = 2;
  var $record = message.record;
  if ($record !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeSyncdRecord($record, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeSyncdMutation = function (binary) {
  return _decodeSyncdMutation(wrapByteBuffer(binary));
}

function _decodeSyncdMutation(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional SyncdOperation operation = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.operation = _decodeSyncdOperation(bb);
        bb.limit = limit;
        break;
      }

      // optional SyncdRecord record = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.record = _decodeSyncdRecord(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdMutations = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdMutations(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdMutations(message, bb) {
  // repeated SyncdMutation mutations = 1;
  var array$mutations = message.mutations;
  if (array$mutations !== undefined) {
    for (var i = 0; i < array$mutations.length; i++) {
      var value = array$mutations[i];
      writeVarint32(bb, 10);
      var nested = popByteBuffer();
      _encodeSyncdMutation(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodeSyncdMutations = function (binary) {
  return _decodeSyncdMutations(wrapByteBuffer(binary));
}

function _decodeSyncdMutations(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // repeated SyncdMutation mutations = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        var values = message.mutations || (message.mutations = []);
        values.push(_decodeSyncdMutation(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdPatch = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdPatch(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdPatch(message, bb) {
  // optional SyncdVersion version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeSyncdVersion($version, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated SyncdMutation mutations = 2;
  var array$mutations = message.mutations;
  if (array$mutations !== undefined) {
    for (var i = 0; i < array$mutations.length; i++) {
      var value = array$mutations[i];
      writeVarint32(bb, 18);
      var nested = popByteBuffer();
      _encodeSyncdMutation(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional ExternalBlobReference externalMutations = 3;
  var $externalMutations = message.externalMutations;
  if ($externalMutations !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeExternalBlobReference($externalMutations, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes snapshotMac = 4;
  var $snapshotMac = message.snapshotMac;
  if ($snapshotMac !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $snapshotMac.length), writeBytes(bb, $snapshotMac);
  }

  // optional bytes patchMac = 5;
  var $patchMac = message.patchMac;
  if ($patchMac !== undefined) {
    writeVarint32(bb, 42);
    writeVarint32(bb, $patchMac.length), writeBytes(bb, $patchMac);
  }

  // optional KeyId keyId = 6;
  var $keyId = message.keyId;
  if ($keyId !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeKeyId($keyId, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional ExitCode exitCode = 7;
  var $exitCode = message.exitCode;
  if ($exitCode !== undefined) {
    writeVarint32(bb, 58);
    var nested = popByteBuffer();
    _encodeExitCode($exitCode, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint32 deviceIndex = 8;
  var $deviceIndex = message.deviceIndex;
  if ($deviceIndex !== undefined) {
    writeVarint32(bb, 64);
    writeVarint32(bb, $deviceIndex);
  }

  // optional bytes clientDebugData = 9;
  var $clientDebugData = message.clientDebugData;
  if ($clientDebugData !== undefined) {
    writeVarint32(bb, 74);
    writeVarint32(bb, $clientDebugData.length), writeBytes(bb, $clientDebugData);
  }
};

exports.decodeSyncdPatch = function (binary) {
  return _decodeSyncdPatch(wrapByteBuffer(binary));
}

function _decodeSyncdPatch(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional SyncdVersion version = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.version = _decodeSyncdVersion(bb);
        bb.limit = limit;
        break;
      }

      // repeated SyncdMutation mutations = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        var values = message.mutations || (message.mutations = []);
        values.push(_decodeSyncdMutation(bb));
        bb.limit = limit;
        break;
      }

      // optional ExternalBlobReference externalMutations = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.externalMutations = _decodeExternalBlobReference(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes snapshotMac = 4;
      case 4: {
        message.snapshotMac = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes patchMac = 5;
      case 5: {
        message.patchMac = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional KeyId keyId = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.keyId = _decodeKeyId(bb);
        bb.limit = limit;
        break;
      }

      // optional ExitCode exitCode = 7;
      case 7: {
        var limit = pushTemporaryLength(bb);
        message.exitCode = _decodeExitCode(bb);
        bb.limit = limit;
        break;
      }

      // optional uint32 deviceIndex = 8;
      case 8: {
        message.deviceIndex = readVarint32(bb) >>> 0;
        break;
      }

      // optional bytes clientDebugData = 9;
      case 9: {
        message.clientDebugData = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdRecord = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdRecord(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdRecord(message, bb) {
  // optional SyncdIndex index = 1;
  var $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeSyncdIndex($index, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional SyncdValue value = 2;
  var $value = message.value;
  if ($value !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeSyncdValue($value, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional KeyId keyId = 3;
  var $keyId = message.keyId;
  if ($keyId !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeKeyId($keyId, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeSyncdRecord = function (binary) {
  return _decodeSyncdRecord(wrapByteBuffer(binary));
}

function _decodeSyncdRecord(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional SyncdIndex index = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.index = _decodeSyncdIndex(bb);
        bb.limit = limit;
        break;
      }

      // optional SyncdValue value = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.value = _decodeSyncdValue(bb);
        bb.limit = limit;
        break;
      }

      // optional KeyId keyId = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.keyId = _decodeKeyId(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdSnapshot = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdSnapshot(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdSnapshot(message, bb) {
  // optional SyncdVersion version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeSyncdVersion($version, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated SyncdRecord records = 2;
  var array$records = message.records;
  if (array$records !== undefined) {
    for (var i = 0; i < array$records.length; i++) {
      var value = array$records[i];
      writeVarint32(bb, 18);
      var nested = popByteBuffer();
      _encodeSyncdRecord(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional bytes mac = 3;
  var $mac = message.mac;
  if ($mac !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $mac.length), writeBytes(bb, $mac);
  }

  // optional KeyId keyId = 4;
  var $keyId = message.keyId;
  if ($keyId !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeKeyId($keyId, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeSyncdSnapshot = function (binary) {
  return _decodeSyncdSnapshot(wrapByteBuffer(binary));
}

function _decodeSyncdSnapshot(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional SyncdVersion version = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.version = _decodeSyncdVersion(bb);
        bb.limit = limit;
        break;
      }

      // repeated SyncdRecord records = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        var values = message.records || (message.records = []);
        values.push(_decodeSyncdRecord(bb));
        bb.limit = limit;
        break;
      }

      // optional bytes mac = 3;
      case 3: {
        message.mac = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional KeyId keyId = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.keyId = _decodeKeyId(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdValue = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdValue(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdValue(message, bb) {
  // optional bytes blob = 1;
  var $blob = message.blob;
  if ($blob !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $blob.length), writeBytes(bb, $blob);
  }
};

exports.decodeSyncdValue = function (binary) {
  return _decodeSyncdValue(wrapByteBuffer(binary));
}

function _decodeSyncdValue(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes blob = 1;
      case 1: {
        message.blob = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeSyncdVersion = function (message) {
  var bb = popByteBuffer();
  _encodeSyncdVersion(message, bb);
  return toUint8Array(bb);
}

function _encodeSyncdVersion(message, bb) {
  // optional uint64 version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    writeVarint32(bb, 8);
    writeVarint64(bb, $version);
  }
};

exports.decodeSyncdVersion = function (binary) {
  return _decodeSyncdVersion(wrapByteBuffer(binary));
}

function _decodeSyncdVersion(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 version = 1;
      case 1: {
        message.version = readVarint64(bb, /* unsigned */ true);
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeTemplateButton = function (message) {
  var bb = popByteBuffer();
  _encodeTemplateButton(message, bb);
  return toUint8Array(bb);
}

function _encodeTemplateButton(message, bb) {
  // optional uint32 index = 4;
  var $index = message.index;
  if ($index !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, $index);
  }

  // optional TemplateButton.QuickReplyButton quickReplyButton = 1;
  var $quickReplyButton = message.quickReplyButton;
  if ($quickReplyButton !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeTemplateButton.QuickReplyButton($quickReplyButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TemplateButton.URLButton urlButton = 2;
  var $urlButton = message.urlButton;
  if ($urlButton !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeTemplateButton.URLButton($urlButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional TemplateButton.CallButton callButton = 3;
  var $callButton = message.callButton;
  if ($callButton !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeTemplateButton.CallButton($callButton, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeTemplateButton = function (binary) {
  return _decodeTemplateButton(wrapByteBuffer(binary));
}

function _decodeTemplateButton(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint32 index = 4;
      case 4: {
        message.index = readVarint32(bb) >>> 0;
        break;
      }

      // optional TemplateButton.QuickReplyButton quickReplyButton = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.quickReplyButton = _decodeTemplateButton.QuickReplyButton(bb);
        bb.limit = limit;
        break;
      }

      // optional TemplateButton.URLButton urlButton = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.urlButton = _decodeTemplateButton.URLButton(bb);
        bb.limit = limit;
        break;
      }

      // optional TemplateButton.CallButton callButton = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.callButton = _decodeTemplateButton.CallButton(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeUserPassword = function (message) {
  var bb = popByteBuffer();
  _encodeUserPassword(message, bb);
  return toUint8Array(bb);
}

function _encodeUserPassword(message, bb) {
  // optional Encoding encoding = 1;
  var $encoding = message.encoding;
  if ($encoding !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeEncoding($encoding, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Transformer transformer = 2;
  var $transformer = message.transformer;
  if ($transformer !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeTransformer($transformer, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated TransformerArg transformerArg = 3;
  var array$transformerArg = message.transformerArg;
  if (array$transformerArg !== undefined) {
    for (var i = 0; i < array$transformerArg.length; i++) {
      var value = array$transformerArg[i];
      writeVarint32(bb, 26);
      var nested = popByteBuffer();
      _encodeTransformerArg(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional bytes transformedData = 4;
  var $transformedData = message.transformedData;
  if ($transformedData !== undefined) {
    writeVarint32(bb, 34);
    writeVarint32(bb, $transformedData.length), writeBytes(bb, $transformedData);
  }
};

exports.decodeUserPassword = function (binary) {
  return _decodeUserPassword(wrapByteBuffer(binary));
}

function _decodeUserPassword(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Encoding encoding = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.encoding = _decodeEncoding(bb);
        bb.limit = limit;
        break;
      }

      // optional Transformer transformer = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.transformer = _decodeTransformer(bb);
        bb.limit = limit;
        break;
      }

      // repeated TransformerArg transformerArg = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        var values = message.transformerArg || (message.transformerArg = []);
        values.push(_decodeTransformerArg(bb));
        bb.limit = limit;
        break;
      }

      // optional bytes transformedData = 4;
      case 4: {
        message.transformedData = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeUserReceipt = function (message) {
  var bb = popByteBuffer();
  _encodeUserReceipt(message, bb);
  return toUint8Array(bb);
}

function _encodeUserReceipt(message, bb) {
  // required string userJid = 1;
  var $userJid = message.userJid;
  if ($userJid !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $userJid);
  }

  // optional int64 receiptTimestamp = 2;
  var $receiptTimestamp = message.receiptTimestamp;
  if ($receiptTimestamp !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $receiptTimestamp);
  }

  // optional int64 readTimestamp = 3;
  var $readTimestamp = message.readTimestamp;
  if ($readTimestamp !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $readTimestamp);
  }

  // optional int64 playedTimestamp = 4;
  var $playedTimestamp = message.playedTimestamp;
  if ($playedTimestamp !== undefined) {
    writeVarint32(bb, 32);
    writeVarint64(bb, $playedTimestamp);
  }

  // repeated string pendingDeviceJid = 5;
  var array$pendingDeviceJid = message.pendingDeviceJid;
  if (array$pendingDeviceJid !== undefined) {
    for (var i = 0; i < array$pendingDeviceJid.length; i++) {
      var value = array$pendingDeviceJid[i];
      writeVarint32(bb, 42);
      writeString(bb, value);
    }
  }

  // repeated string deliveredDeviceJid = 6;
  var array$deliveredDeviceJid = message.deliveredDeviceJid;
  if (array$deliveredDeviceJid !== undefined) {
    for (var i = 0; i < array$deliveredDeviceJid.length; i++) {
      var value = array$deliveredDeviceJid[i];
      writeVarint32(bb, 50);
      writeString(bb, value);
    }
  }
};

exports.decodeUserReceipt = function (binary) {
  return _decodeUserReceipt(wrapByteBuffer(binary));
}

function _decodeUserReceipt(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required string userJid = 1;
      case 1: {
        message.userJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional int64 receiptTimestamp = 2;
      case 2: {
        message.receiptTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 readTimestamp = 3;
      case 3: {
        message.readTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // optional int64 playedTimestamp = 4;
      case 4: {
        message.playedTimestamp = readVarint64(bb, /* unsigned */ false);
        break;
      }

      // repeated string pendingDeviceJid = 5;
      case 5: {
        var values = message.pendingDeviceJid || (message.pendingDeviceJid = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // repeated string deliveredDeviceJid = 6;
      case 6: {
        var values = message.deliveredDeviceJid || (message.deliveredDeviceJid = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.userJid === undefined)
    throw new Error("Missing required field: userJid");

  return message;
};

exports.encodeVerifiedNameCertificate = function (message) {
  var bb = popByteBuffer();
  _encodeVerifiedNameCertificate(message, bb);
  return toUint8Array(bb);
}

function _encodeVerifiedNameCertificate(message, bb) {
  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    writeVarint32(bb, 10);
    writeVarint32(bb, $details.length), writeBytes(bb, $details);
  }

  // optional bytes signature = 2;
  var $signature = message.signature;
  if ($signature !== undefined) {
    writeVarint32(bb, 18);
    writeVarint32(bb, $signature.length), writeBytes(bb, $signature);
  }

  // optional bytes serverSignature = 3;
  var $serverSignature = message.serverSignature;
  if ($serverSignature !== undefined) {
    writeVarint32(bb, 26);
    writeVarint32(bb, $serverSignature.length), writeBytes(bb, $serverSignature);
  }
};

exports.decodeVerifiedNameCertificate = function (binary) {
  return _decodeVerifiedNameCertificate(wrapByteBuffer(binary));
}

function _decodeVerifiedNameCertificate(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional bytes details = 1;
      case 1: {
        message.details = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes signature = 2;
      case 2: {
        message.signature = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bytes serverSignature = 3;
      case 3: {
        message.serverSignature = readBytes(bb, readVarint32(bb));
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeWallpaperSettings = function (message) {
  var bb = popByteBuffer();
  _encodeWallpaperSettings(message, bb);
  return toUint8Array(bb);
}

function _encodeWallpaperSettings(message, bb) {
  // optional string filename = 1;
  var $filename = message.filename;
  if ($filename !== undefined) {
    writeVarint32(bb, 10);
    writeString(bb, $filename);
  }

  // optional uint32 opacity = 2;
  var $opacity = message.opacity;
  if ($opacity !== undefined) {
    writeVarint32(bb, 16);
    writeVarint32(bb, $opacity);
  }
};

exports.decodeWallpaperSettings = function (binary) {
  return _decodeWallpaperSettings(wrapByteBuffer(binary));
}

function _decodeWallpaperSettings(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional string filename = 1;
      case 1: {
        message.filename = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint32 opacity = 2;
      case 2: {
        message.opacity = readVarint32(bb) >>> 0;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeWebFeatures = function (message) {
  var bb = popByteBuffer();
  _encodeWebFeatures(message, bb);
  return toUint8Array(bb);
}

function _encodeWebFeatures(message, bb) {
  // optional Flag labelsDisplay = 1;
  var $labelsDisplay = message.labelsDisplay;
  if ($labelsDisplay !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeFlag($labelsDisplay, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag voipIndividualOutgoing = 2;
  var $voipIndividualOutgoing = message.voipIndividualOutgoing;
  if ($voipIndividualOutgoing !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeFlag($voipIndividualOutgoing, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag groupsV3 = 3;
  var $groupsV3 = message.groupsV3;
  if ($groupsV3 !== undefined) {
    writeVarint32(bb, 26);
    var nested = popByteBuffer();
    _encodeFlag($groupsV3, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag groupsV3Create = 4;
  var $groupsV3Create = message.groupsV3Create;
  if ($groupsV3Create !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeFlag($groupsV3Create, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag changeNumberV2 = 5;
  var $changeNumberV2 = message.changeNumberV2;
  if ($changeNumberV2 !== undefined) {
    writeVarint32(bb, 42);
    var nested = popByteBuffer();
    _encodeFlag($changeNumberV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag queryStatusV3Thumbnail = 6;
  var $queryStatusV3Thumbnail = message.queryStatusV3Thumbnail;
  if ($queryStatusV3Thumbnail !== undefined) {
    writeVarint32(bb, 50);
    var nested = popByteBuffer();
    _encodeFlag($queryStatusV3Thumbnail, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag liveLocations = 7;
  var $liveLocations = message.liveLocations;
  if ($liveLocations !== undefined) {
    writeVarint32(bb, 58);
    var nested = popByteBuffer();
    _encodeFlag($liveLocations, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag queryVname = 8;
  var $queryVname = message.queryVname;
  if ($queryVname !== undefined) {
    writeVarint32(bb, 66);
    var nested = popByteBuffer();
    _encodeFlag($queryVname, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag voipIndividualIncoming = 9;
  var $voipIndividualIncoming = message.voipIndividualIncoming;
  if ($voipIndividualIncoming !== undefined) {
    writeVarint32(bb, 74);
    var nested = popByteBuffer();
    _encodeFlag($voipIndividualIncoming, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag quickRepliesQuery = 10;
  var $quickRepliesQuery = message.quickRepliesQuery;
  if ($quickRepliesQuery !== undefined) {
    writeVarint32(bb, 82);
    var nested = popByteBuffer();
    _encodeFlag($quickRepliesQuery, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag payments = 11;
  var $payments = message.payments;
  if ($payments !== undefined) {
    writeVarint32(bb, 90);
    var nested = popByteBuffer();
    _encodeFlag($payments, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag stickerPackQuery = 12;
  var $stickerPackQuery = message.stickerPackQuery;
  if ($stickerPackQuery !== undefined) {
    writeVarint32(bb, 98);
    var nested = popByteBuffer();
    _encodeFlag($stickerPackQuery, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag liveLocationsFinal = 13;
  var $liveLocationsFinal = message.liveLocationsFinal;
  if ($liveLocationsFinal !== undefined) {
    writeVarint32(bb, 106);
    var nested = popByteBuffer();
    _encodeFlag($liveLocationsFinal, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag labelsEdit = 14;
  var $labelsEdit = message.labelsEdit;
  if ($labelsEdit !== undefined) {
    writeVarint32(bb, 114);
    var nested = popByteBuffer();
    _encodeFlag($labelsEdit, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag mediaUpload = 15;
  var $mediaUpload = message.mediaUpload;
  if ($mediaUpload !== undefined) {
    writeVarint32(bb, 122);
    var nested = popByteBuffer();
    _encodeFlag($mediaUpload, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag mediaUploadRichQuickReplies = 18;
  var $mediaUploadRichQuickReplies = message.mediaUploadRichQuickReplies;
  if ($mediaUploadRichQuickReplies !== undefined) {
    writeVarint32(bb, 146);
    var nested = popByteBuffer();
    _encodeFlag($mediaUploadRichQuickReplies, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag vnameV2 = 19;
  var $vnameV2 = message.vnameV2;
  if ($vnameV2 !== undefined) {
    writeVarint32(bb, 154);
    var nested = popByteBuffer();
    _encodeFlag($vnameV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag videoPlaybackUrl = 20;
  var $videoPlaybackUrl = message.videoPlaybackUrl;
  if ($videoPlaybackUrl !== undefined) {
    writeVarint32(bb, 162);
    var nested = popByteBuffer();
    _encodeFlag($videoPlaybackUrl, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag statusRanking = 21;
  var $statusRanking = message.statusRanking;
  if ($statusRanking !== undefined) {
    writeVarint32(bb, 170);
    var nested = popByteBuffer();
    _encodeFlag($statusRanking, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag voipIndividualVideo = 22;
  var $voipIndividualVideo = message.voipIndividualVideo;
  if ($voipIndividualVideo !== undefined) {
    writeVarint32(bb, 178);
    var nested = popByteBuffer();
    _encodeFlag($voipIndividualVideo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag thirdPartyStickers = 23;
  var $thirdPartyStickers = message.thirdPartyStickers;
  if ($thirdPartyStickers !== undefined) {
    writeVarint32(bb, 186);
    var nested = popByteBuffer();
    _encodeFlag($thirdPartyStickers, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag frequentlyForwardedSetting = 24;
  var $frequentlyForwardedSetting = message.frequentlyForwardedSetting;
  if ($frequentlyForwardedSetting !== undefined) {
    writeVarint32(bb, 194);
    var nested = popByteBuffer();
    _encodeFlag($frequentlyForwardedSetting, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag groupsV4JoinPermission = 25;
  var $groupsV4JoinPermission = message.groupsV4JoinPermission;
  if ($groupsV4JoinPermission !== undefined) {
    writeVarint32(bb, 202);
    var nested = popByteBuffer();
    _encodeFlag($groupsV4JoinPermission, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag recentStickers = 26;
  var $recentStickers = message.recentStickers;
  if ($recentStickers !== undefined) {
    writeVarint32(bb, 210);
    var nested = popByteBuffer();
    _encodeFlag($recentStickers, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag catalog = 27;
  var $catalog = message.catalog;
  if ($catalog !== undefined) {
    writeVarint32(bb, 218);
    var nested = popByteBuffer();
    _encodeFlag($catalog, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag starredStickers = 28;
  var $starredStickers = message.starredStickers;
  if ($starredStickers !== undefined) {
    writeVarint32(bb, 226);
    var nested = popByteBuffer();
    _encodeFlag($starredStickers, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag voipGroupCall = 29;
  var $voipGroupCall = message.voipGroupCall;
  if ($voipGroupCall !== undefined) {
    writeVarint32(bb, 234);
    var nested = popByteBuffer();
    _encodeFlag($voipGroupCall, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag templateMessage = 30;
  var $templateMessage = message.templateMessage;
  if ($templateMessage !== undefined) {
    writeVarint32(bb, 242);
    var nested = popByteBuffer();
    _encodeFlag($templateMessage, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag templateMessageInteractivity = 31;
  var $templateMessageInteractivity = message.templateMessageInteractivity;
  if ($templateMessageInteractivity !== undefined) {
    writeVarint32(bb, 250);
    var nested = popByteBuffer();
    _encodeFlag($templateMessageInteractivity, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag ephemeralMessages = 32;
  var $ephemeralMessages = message.ephemeralMessages;
  if ($ephemeralMessages !== undefined) {
    writeVarint32(bb, 258);
    var nested = popByteBuffer();
    _encodeFlag($ephemeralMessages, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag e2ENotificationSync = 33;
  var $e2ENotificationSync = message.e2ENotificationSync;
  if ($e2ENotificationSync !== undefined) {
    writeVarint32(bb, 266);
    var nested = popByteBuffer();
    _encodeFlag($e2ENotificationSync, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag recentStickersV2 = 34;
  var $recentStickersV2 = message.recentStickersV2;
  if ($recentStickersV2 !== undefined) {
    writeVarint32(bb, 274);
    var nested = popByteBuffer();
    _encodeFlag($recentStickersV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag recentStickersV3 = 36;
  var $recentStickersV3 = message.recentStickersV3;
  if ($recentStickersV3 !== undefined) {
    writeVarint32(bb, 290);
    var nested = popByteBuffer();
    _encodeFlag($recentStickersV3, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag userNotice = 37;
  var $userNotice = message.userNotice;
  if ($userNotice !== undefined) {
    writeVarint32(bb, 298);
    var nested = popByteBuffer();
    _encodeFlag($userNotice, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag support = 39;
  var $support = message.support;
  if ($support !== undefined) {
    writeVarint32(bb, 314);
    var nested = popByteBuffer();
    _encodeFlag($support, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag groupUiiCleanup = 40;
  var $groupUiiCleanup = message.groupUiiCleanup;
  if ($groupUiiCleanup !== undefined) {
    writeVarint32(bb, 322);
    var nested = popByteBuffer();
    _encodeFlag($groupUiiCleanup, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag groupDogfoodingInternalOnly = 41;
  var $groupDogfoodingInternalOnly = message.groupDogfoodingInternalOnly;
  if ($groupDogfoodingInternalOnly !== undefined) {
    writeVarint32(bb, 330);
    var nested = popByteBuffer();
    _encodeFlag($groupDogfoodingInternalOnly, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag settingsSync = 42;
  var $settingsSync = message.settingsSync;
  if ($settingsSync !== undefined) {
    writeVarint32(bb, 338);
    var nested = popByteBuffer();
    _encodeFlag($settingsSync, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag archiveV2 = 43;
  var $archiveV2 = message.archiveV2;
  if ($archiveV2 !== undefined) {
    writeVarint32(bb, 346);
    var nested = popByteBuffer();
    _encodeFlag($archiveV2, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag ephemeralAllowGroupMembers = 44;
  var $ephemeralAllowGroupMembers = message.ephemeralAllowGroupMembers;
  if ($ephemeralAllowGroupMembers !== undefined) {
    writeVarint32(bb, 354);
    var nested = popByteBuffer();
    _encodeFlag($ephemeralAllowGroupMembers, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag ephemeral24HDuration = 45;
  var $ephemeral24HDuration = message.ephemeral24HDuration;
  if ($ephemeral24HDuration !== undefined) {
    writeVarint32(bb, 362);
    var nested = popByteBuffer();
    _encodeFlag($ephemeral24HDuration, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag mdForceUpgrade = 46;
  var $mdForceUpgrade = message.mdForceUpgrade;
  if ($mdForceUpgrade !== undefined) {
    writeVarint32(bb, 370);
    var nested = popByteBuffer();
    _encodeFlag($mdForceUpgrade, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag disappearingMode = 47;
  var $disappearingMode = message.disappearingMode;
  if ($disappearingMode !== undefined) {
    writeVarint32(bb, 378);
    var nested = popByteBuffer();
    _encodeFlag($disappearingMode, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag externalMdOptInAvailable = 48;
  var $externalMdOptInAvailable = message.externalMdOptInAvailable;
  if ($externalMdOptInAvailable !== undefined) {
    writeVarint32(bb, 386);
    var nested = popByteBuffer();
    _encodeFlag($externalMdOptInAvailable, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Flag noDeleteMessageTimeLimit = 49;
  var $noDeleteMessageTimeLimit = message.noDeleteMessageTimeLimit;
  if ($noDeleteMessageTimeLimit !== undefined) {
    writeVarint32(bb, 394);
    var nested = popByteBuffer();
    _encodeFlag($noDeleteMessageTimeLimit, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeWebFeatures = function (binary) {
  return _decodeWebFeatures(wrapByteBuffer(binary));
}

function _decodeWebFeatures(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional Flag labelsDisplay = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.labelsDisplay = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag voipIndividualOutgoing = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.voipIndividualOutgoing = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag groupsV3 = 3;
      case 3: {
        var limit = pushTemporaryLength(bb);
        message.groupsV3 = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag groupsV3Create = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.groupsV3Create = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag changeNumberV2 = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        message.changeNumberV2 = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag queryStatusV3Thumbnail = 6;
      case 6: {
        var limit = pushTemporaryLength(bb);
        message.queryStatusV3Thumbnail = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag liveLocations = 7;
      case 7: {
        var limit = pushTemporaryLength(bb);
        message.liveLocations = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag queryVname = 8;
      case 8: {
        var limit = pushTemporaryLength(bb);
        message.queryVname = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag voipIndividualIncoming = 9;
      case 9: {
        var limit = pushTemporaryLength(bb);
        message.voipIndividualIncoming = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag quickRepliesQuery = 10;
      case 10: {
        var limit = pushTemporaryLength(bb);
        message.quickRepliesQuery = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag payments = 11;
      case 11: {
        var limit = pushTemporaryLength(bb);
        message.payments = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag stickerPackQuery = 12;
      case 12: {
        var limit = pushTemporaryLength(bb);
        message.stickerPackQuery = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag liveLocationsFinal = 13;
      case 13: {
        var limit = pushTemporaryLength(bb);
        message.liveLocationsFinal = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag labelsEdit = 14;
      case 14: {
        var limit = pushTemporaryLength(bb);
        message.labelsEdit = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag mediaUpload = 15;
      case 15: {
        var limit = pushTemporaryLength(bb);
        message.mediaUpload = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag mediaUploadRichQuickReplies = 18;
      case 18: {
        var limit = pushTemporaryLength(bb);
        message.mediaUploadRichQuickReplies = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag vnameV2 = 19;
      case 19: {
        var limit = pushTemporaryLength(bb);
        message.vnameV2 = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag videoPlaybackUrl = 20;
      case 20: {
        var limit = pushTemporaryLength(bb);
        message.videoPlaybackUrl = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag statusRanking = 21;
      case 21: {
        var limit = pushTemporaryLength(bb);
        message.statusRanking = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag voipIndividualVideo = 22;
      case 22: {
        var limit = pushTemporaryLength(bb);
        message.voipIndividualVideo = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag thirdPartyStickers = 23;
      case 23: {
        var limit = pushTemporaryLength(bb);
        message.thirdPartyStickers = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag frequentlyForwardedSetting = 24;
      case 24: {
        var limit = pushTemporaryLength(bb);
        message.frequentlyForwardedSetting = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag groupsV4JoinPermission = 25;
      case 25: {
        var limit = pushTemporaryLength(bb);
        message.groupsV4JoinPermission = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag recentStickers = 26;
      case 26: {
        var limit = pushTemporaryLength(bb);
        message.recentStickers = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag catalog = 27;
      case 27: {
        var limit = pushTemporaryLength(bb);
        message.catalog = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag starredStickers = 28;
      case 28: {
        var limit = pushTemporaryLength(bb);
        message.starredStickers = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag voipGroupCall = 29;
      case 29: {
        var limit = pushTemporaryLength(bb);
        message.voipGroupCall = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag templateMessage = 30;
      case 30: {
        var limit = pushTemporaryLength(bb);
        message.templateMessage = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag templateMessageInteractivity = 31;
      case 31: {
        var limit = pushTemporaryLength(bb);
        message.templateMessageInteractivity = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag ephemeralMessages = 32;
      case 32: {
        var limit = pushTemporaryLength(bb);
        message.ephemeralMessages = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag e2ENotificationSync = 33;
      case 33: {
        var limit = pushTemporaryLength(bb);
        message.e2ENotificationSync = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag recentStickersV2 = 34;
      case 34: {
        var limit = pushTemporaryLength(bb);
        message.recentStickersV2 = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag recentStickersV3 = 36;
      case 36: {
        var limit = pushTemporaryLength(bb);
        message.recentStickersV3 = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag userNotice = 37;
      case 37: {
        var limit = pushTemporaryLength(bb);
        message.userNotice = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag support = 39;
      case 39: {
        var limit = pushTemporaryLength(bb);
        message.support = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag groupUiiCleanup = 40;
      case 40: {
        var limit = pushTemporaryLength(bb);
        message.groupUiiCleanup = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag groupDogfoodingInternalOnly = 41;
      case 41: {
        var limit = pushTemporaryLength(bb);
        message.groupDogfoodingInternalOnly = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag settingsSync = 42;
      case 42: {
        var limit = pushTemporaryLength(bb);
        message.settingsSync = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag archiveV2 = 43;
      case 43: {
        var limit = pushTemporaryLength(bb);
        message.archiveV2 = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag ephemeralAllowGroupMembers = 44;
      case 44: {
        var limit = pushTemporaryLength(bb);
        message.ephemeralAllowGroupMembers = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag ephemeral24HDuration = 45;
      case 45: {
        var limit = pushTemporaryLength(bb);
        message.ephemeral24HDuration = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag mdForceUpgrade = 46;
      case 46: {
        var limit = pushTemporaryLength(bb);
        message.mdForceUpgrade = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag disappearingMode = 47;
      case 47: {
        var limit = pushTemporaryLength(bb);
        message.disappearingMode = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag externalMdOptInAvailable = 48;
      case 48: {
        var limit = pushTemporaryLength(bb);
        message.externalMdOptInAvailable = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      // optional Flag noDeleteMessageTimeLimit = 49;
      case 49: {
        var limit = pushTemporaryLength(bb);
        message.noDeleteMessageTimeLimit = _decodeFlag(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

exports.encodeWebMessageInfo = function (message) {
  var bb = popByteBuffer();
  _encodeWebMessageInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeWebMessageInfo(message, bb) {
  // required MessageKey key = 1;
  var $key = message.key;
  if ($key !== undefined) {
    writeVarint32(bb, 10);
    var nested = popByteBuffer();
    _encodeMessageKey($key, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Message message = 2;
  var $message = message.message;
  if ($message !== undefined) {
    writeVarint32(bb, 18);
    var nested = popByteBuffer();
    _encodeMessage($message, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 messageTimestamp = 3;
  var $messageTimestamp = message.messageTimestamp;
  if ($messageTimestamp !== undefined) {
    writeVarint32(bb, 24);
    writeVarint64(bb, $messageTimestamp);
  }

  // optional Status status = 4;
  var $status = message.status;
  if ($status !== undefined) {
    writeVarint32(bb, 34);
    var nested = popByteBuffer();
    _encodeStatus($status, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string participant = 5;
  var $participant = message.participant;
  if ($participant !== undefined) {
    writeVarint32(bb, 42);
    writeString(bb, $participant);
  }

  // optional uint64 messageC2STimestamp = 6;
  var $messageC2STimestamp = message.messageC2STimestamp;
  if ($messageC2STimestamp !== undefined) {
    writeVarint32(bb, 48);
    writeVarint64(bb, $messageC2STimestamp);
  }

  // optional bool ignore = 16;
  var $ignore = message.ignore;
  if ($ignore !== undefined) {
    writeVarint32(bb, 128);
    writeByte(bb, $ignore ? 1 : 0);
  }

  // optional bool starred = 17;
  var $starred = message.starred;
  if ($starred !== undefined) {
    writeVarint32(bb, 136);
    writeByte(bb, $starred ? 1 : 0);
  }

  // optional bool broadcast = 18;
  var $broadcast = message.broadcast;
  if ($broadcast !== undefined) {
    writeVarint32(bb, 144);
    writeByte(bb, $broadcast ? 1 : 0);
  }

  // optional string pushName = 19;
  var $pushName = message.pushName;
  if ($pushName !== undefined) {
    writeVarint32(bb, 154);
    writeString(bb, $pushName);
  }

  // optional bytes mediaCiphertextSha256 = 20;
  var $mediaCiphertextSha256 = message.mediaCiphertextSha256;
  if ($mediaCiphertextSha256 !== undefined) {
    writeVarint32(bb, 162);
    writeVarint32(bb, $mediaCiphertextSha256.length), writeBytes(bb, $mediaCiphertextSha256);
  }

  // optional bool multicast = 21;
  var $multicast = message.multicast;
  if ($multicast !== undefined) {
    writeVarint32(bb, 168);
    writeByte(bb, $multicast ? 1 : 0);
  }

  // optional bool urlText = 22;
  var $urlText = message.urlText;
  if ($urlText !== undefined) {
    writeVarint32(bb, 176);
    writeByte(bb, $urlText ? 1 : 0);
  }

  // optional bool urlNumber = 23;
  var $urlNumber = message.urlNumber;
  if ($urlNumber !== undefined) {
    writeVarint32(bb, 184);
    writeByte(bb, $urlNumber ? 1 : 0);
  }

  // optional StubType messageStubType = 24;
  var $messageStubType = message.messageStubType;
  if ($messageStubType !== undefined) {
    writeVarint32(bb, 194);
    var nested = popByteBuffer();
    _encodeStubType($messageStubType, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool clearMedia = 25;
  var $clearMedia = message.clearMedia;
  if ($clearMedia !== undefined) {
    writeVarint32(bb, 200);
    writeByte(bb, $clearMedia ? 1 : 0);
  }

  // repeated string messageStubParameters = 26;
  var array$messageStubParameters = message.messageStubParameters;
  if (array$messageStubParameters !== undefined) {
    for (var i = 0; i < array$messageStubParameters.length; i++) {
      var value = array$messageStubParameters[i];
      writeVarint32(bb, 210);
      writeString(bb, value);
    }
  }

  // optional uint32 duration = 27;
  var $duration = message.duration;
  if ($duration !== undefined) {
    writeVarint32(bb, 216);
    writeVarint32(bb, $duration);
  }

  // repeated string labels = 28;
  var array$labels = message.labels;
  if (array$labels !== undefined) {
    for (var i = 0; i < array$labels.length; i++) {
      var value = array$labels[i];
      writeVarint32(bb, 226);
      writeString(bb, value);
    }
  }

  // optional PaymentInfo paymentInfo = 29;
  var $paymentInfo = message.paymentInfo;
  if ($paymentInfo !== undefined) {
    writeVarint32(bb, 234);
    var nested = popByteBuffer();
    _encodePaymentInfo($paymentInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional Message.LiveLocationMessage finalLiveLocation = 30;
  var $finalLiveLocation = message.finalLiveLocation;
  if ($finalLiveLocation !== undefined) {
    writeVarint32(bb, 242);
    var nested = popByteBuffer();
    _encodeMessage.LiveLocationMessage($finalLiveLocation, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PaymentInfo quotedPaymentInfo = 31;
  var $quotedPaymentInfo = message.quotedPaymentInfo;
  if ($quotedPaymentInfo !== undefined) {
    writeVarint32(bb, 250);
    var nested = popByteBuffer();
    _encodePaymentInfo($quotedPaymentInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 ephemeralStartTimestamp = 32;
  var $ephemeralStartTimestamp = message.ephemeralStartTimestamp;
  if ($ephemeralStartTimestamp !== undefined) {
    writeVarint32(bb, 256);
    writeVarint64(bb, $ephemeralStartTimestamp);
  }

  // optional uint32 ephemeralDuration = 33;
  var $ephemeralDuration = message.ephemeralDuration;
  if ($ephemeralDuration !== undefined) {
    writeVarint32(bb, 264);
    writeVarint32(bb, $ephemeralDuration);
  }

  // optional bool ephemeralOffToOn = 34;
  var $ephemeralOffToOn = message.ephemeralOffToOn;
  if ($ephemeralOffToOn !== undefined) {
    writeVarint32(bb, 272);
    writeByte(bb, $ephemeralOffToOn ? 1 : 0);
  }

  // optional bool ephemeralOutOfSync = 35;
  var $ephemeralOutOfSync = message.ephemeralOutOfSync;
  if ($ephemeralOutOfSync !== undefined) {
    writeVarint32(bb, 280);
    writeByte(bb, $ephemeralOutOfSync ? 1 : 0);
  }

  // optional BizPrivacyStatus bizPrivacyStatus = 36;
  var $bizPrivacyStatus = message.bizPrivacyStatus;
  if ($bizPrivacyStatus !== undefined) {
    writeVarint32(bb, 290);
    var nested = popByteBuffer();
    _encodeBizPrivacyStatus($bizPrivacyStatus, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string verifiedBizName = 37;
  var $verifiedBizName = message.verifiedBizName;
  if ($verifiedBizName !== undefined) {
    writeVarint32(bb, 298);
    writeString(bb, $verifiedBizName);
  }

  // optional MediaData mediaData = 38;
  var $mediaData = message.mediaData;
  if ($mediaData !== undefined) {
    writeVarint32(bb, 306);
    var nested = popByteBuffer();
    _encodeMediaData($mediaData, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PhotoChange photoChange = 39;
  var $photoChange = message.photoChange;
  if ($photoChange !== undefined) {
    writeVarint32(bb, 314);
    var nested = popByteBuffer();
    _encodePhotoChange($photoChange, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated UserReceipt userReceipt = 40;
  var array$userReceipt = message.userReceipt;
  if (array$userReceipt !== undefined) {
    for (var i = 0; i < array$userReceipt.length; i++) {
      var value = array$userReceipt[i];
      writeVarint32(bb, 322);
      var nested = popByteBuffer();
      _encodeUserReceipt(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // repeated Reaction reactions = 41;
  var array$reactions = message.reactions;
  if (array$reactions !== undefined) {
    for (var i = 0; i < array$reactions.length; i++) {
      var value = array$reactions[i];
      writeVarint32(bb, 330);
      var nested = popByteBuffer();
      _encodeReaction(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional MediaData quotedStickerData = 42;
  var $quotedStickerData = message.quotedStickerData;
  if ($quotedStickerData !== undefined) {
    writeVarint32(bb, 338);
    var nested = popByteBuffer();
    _encodeMediaData($quotedStickerData, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bytes futureproofData = 43;
  var $futureproofData = message.futureproofData;
  if ($futureproofData !== undefined) {
    writeVarint32(bb, 346);
    writeVarint32(bb, $futureproofData.length), writeBytes(bb, $futureproofData);
  }

  // optional StatusPSA statusPsa = 44;
  var $statusPsa = message.statusPsa;
  if ($statusPsa !== undefined) {
    writeVarint32(bb, 354);
    var nested = popByteBuffer();
    _encodeStatusPSA($statusPsa, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated PollUpdate pollUpdates = 45;
  var array$pollUpdates = message.pollUpdates;
  if (array$pollUpdates !== undefined) {
    for (var i = 0; i < array$pollUpdates.length; i++) {
      var value = array$pollUpdates[i];
      writeVarint32(bb, 362);
      var nested = popByteBuffer();
      _encodePollUpdate(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional PollAdditionalMetadata pollAdditionalMetadata = 46;
  var $pollAdditionalMetadata = message.pollAdditionalMetadata;
  if ($pollAdditionalMetadata !== undefined) {
    writeVarint32(bb, 370);
    var nested = popByteBuffer();
    _encodePollAdditionalMetadata($pollAdditionalMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string agentId = 47;
  var $agentId = message.agentId;
  if ($agentId !== undefined) {
    writeVarint32(bb, 378);
    writeString(bb, $agentId);
  }

  // optional bool statusAlreadyViewed = 48;
  var $statusAlreadyViewed = message.statusAlreadyViewed;
  if ($statusAlreadyViewed !== undefined) {
    writeVarint32(bb, 384);
    writeByte(bb, $statusAlreadyViewed ? 1 : 0);
  }

  // optional bytes messageSecret = 49;
  var $messageSecret = message.messageSecret;
  if ($messageSecret !== undefined) {
    writeVarint32(bb, 394);
    writeVarint32(bb, $messageSecret.length), writeBytes(bb, $messageSecret);
  }

  // optional KeepInChat keepInChat = 50;
  var $keepInChat = message.keepInChat;
  if ($keepInChat !== undefined) {
    writeVarint32(bb, 402);
    var nested = popByteBuffer();
    _encodeKeepInChat($keepInChat, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional string originalSelfAuthorUserJidString = 51;
  var $originalSelfAuthorUserJidString = message.originalSelfAuthorUserJidString;
  if ($originalSelfAuthorUserJidString !== undefined) {
    writeVarint32(bb, 410);
    writeString(bb, $originalSelfAuthorUserJidString);
  }

  // optional uint64 revokeMessageTimestamp = 52;
  var $revokeMessageTimestamp = message.revokeMessageTimestamp;
  if ($revokeMessageTimestamp !== undefined) {
    writeVarint32(bb, 416);
    writeVarint64(bb, $revokeMessageTimestamp);
  }

  // optional PinInChat pinInChat = 54;
  var $pinInChat = message.pinInChat;
  if ($pinInChat !== undefined) {
    writeVarint32(bb, 434);
    var nested = popByteBuffer();
    _encodePinInChat($pinInChat, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional PremiumMessageInfo premiumMessageInfo = 55;
  var $premiumMessageInfo = message.premiumMessageInfo;
  if ($premiumMessageInfo !== undefined) {
    writeVarint32(bb, 442);
    var nested = popByteBuffer();
    _encodePremiumMessageInfo($premiumMessageInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional bool is1PBizBotMessage = 56;
  var $is1PBizBotMessage = message.is1PBizBotMessage;
  if ($is1PBizBotMessage !== undefined) {
    writeVarint32(bb, 448);
    writeByte(bb, $is1PBizBotMessage ? 1 : 0);
  }

  // optional bool isGroupHistoryMessage = 57;
  var $isGroupHistoryMessage = message.isGroupHistoryMessage;
  if ($isGroupHistoryMessage !== undefined) {
    writeVarint32(bb, 456);
    writeByte(bb, $isGroupHistoryMessage ? 1 : 0);
  }

  // optional string botMessageInvokerJid = 58;
  var $botMessageInvokerJid = message.botMessageInvokerJid;
  if ($botMessageInvokerJid !== undefined) {
    writeVarint32(bb, 466);
    writeString(bb, $botMessageInvokerJid);
  }

  // optional CommentMetadata commentMetadata = 59;
  var $commentMetadata = message.commentMetadata;
  if ($commentMetadata !== undefined) {
    writeVarint32(bb, 474);
    var nested = popByteBuffer();
    _encodeCommentMetadata($commentMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // repeated EventResponse eventResponses = 61;
  var array$eventResponses = message.eventResponses;
  if (array$eventResponses !== undefined) {
    for (var i = 0; i < array$eventResponses.length; i++) {
      var value = array$eventResponses[i];
      writeVarint32(bb, 490);
      var nested = popByteBuffer();
      _encodeEventResponse(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }

  // optional ReportingTokenInfo reportingTokenInfo = 62;
  var $reportingTokenInfo = message.reportingTokenInfo;
  if ($reportingTokenInfo !== undefined) {
    writeVarint32(bb, 498);
    var nested = popByteBuffer();
    _encodeReportingTokenInfo($reportingTokenInfo, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }

  // optional uint64 newsletterServerId = 63;
  var $newsletterServerId = message.newsletterServerId;
  if ($newsletterServerId !== undefined) {
    writeVarint32(bb, 504);
    writeVarint64(bb, $newsletterServerId);
  }

  // optional EventAdditionalMetadata eventAdditionalMetadata = 64;
  var $eventAdditionalMetadata = message.eventAdditionalMetadata;
  if ($eventAdditionalMetadata !== undefined) {
    writeVarint32(bb, 514);
    var nested = popByteBuffer();
    _encodeEventAdditionalMetadata($eventAdditionalMetadata, nested);
    writeVarint32(bb, nested.limit);
    writeByteBuffer(bb, nested);
    pushByteBuffer(nested);
  }
};

exports.decodeWebMessageInfo = function (binary) {
  return _decodeWebMessageInfo(wrapByteBuffer(binary));
}

function _decodeWebMessageInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // required MessageKey key = 1;
      case 1: {
        var limit = pushTemporaryLength(bb);
        message.key = _decodeMessageKey(bb);
        bb.limit = limit;
        break;
      }

      // optional Message message = 2;
      case 2: {
        var limit = pushTemporaryLength(bb);
        message.message = _decodeMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 messageTimestamp = 3;
      case 3: {
        message.messageTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional Status status = 4;
      case 4: {
        var limit = pushTemporaryLength(bb);
        message.status = _decodeStatus(bb);
        bb.limit = limit;
        break;
      }

      // optional string participant = 5;
      case 5: {
        message.participant = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 messageC2STimestamp = 6;
      case 6: {
        message.messageC2STimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional bool ignore = 16;
      case 16: {
        message.ignore = !!readByte(bb);
        break;
      }

      // optional bool starred = 17;
      case 17: {
        message.starred = !!readByte(bb);
        break;
      }

      // optional bool broadcast = 18;
      case 18: {
        message.broadcast = !!readByte(bb);
        break;
      }

      // optional string pushName = 19;
      case 19: {
        message.pushName = readString(bb, readVarint32(bb));
        break;
      }

      // optional bytes mediaCiphertextSha256 = 20;
      case 20: {
        message.mediaCiphertextSha256 = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional bool multicast = 21;
      case 21: {
        message.multicast = !!readByte(bb);
        break;
      }

      // optional bool urlText = 22;
      case 22: {
        message.urlText = !!readByte(bb);
        break;
      }

      // optional bool urlNumber = 23;
      case 23: {
        message.urlNumber = !!readByte(bb);
        break;
      }

      // optional StubType messageStubType = 24;
      case 24: {
        var limit = pushTemporaryLength(bb);
        message.messageStubType = _decodeStubType(bb);
        bb.limit = limit;
        break;
      }

      // optional bool clearMedia = 25;
      case 25: {
        message.clearMedia = !!readByte(bb);
        break;
      }

      // repeated string messageStubParameters = 26;
      case 26: {
        var values = message.messageStubParameters || (message.messageStubParameters = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional uint32 duration = 27;
      case 27: {
        message.duration = readVarint32(bb) >>> 0;
        break;
      }

      // repeated string labels = 28;
      case 28: {
        var values = message.labels || (message.labels = []);
        values.push(readString(bb, readVarint32(bb)));
        break;
      }

      // optional PaymentInfo paymentInfo = 29;
      case 29: {
        var limit = pushTemporaryLength(bb);
        message.paymentInfo = _decodePaymentInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional Message.LiveLocationMessage finalLiveLocation = 30;
      case 30: {
        var limit = pushTemporaryLength(bb);
        message.finalLiveLocation = _decodeMessage.LiveLocationMessage(bb);
        bb.limit = limit;
        break;
      }

      // optional PaymentInfo quotedPaymentInfo = 31;
      case 31: {
        var limit = pushTemporaryLength(bb);
        message.quotedPaymentInfo = _decodePaymentInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 ephemeralStartTimestamp = 32;
      case 32: {
        message.ephemeralStartTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint32 ephemeralDuration = 33;
      case 33: {
        message.ephemeralDuration = readVarint32(bb) >>> 0;
        break;
      }

      // optional bool ephemeralOffToOn = 34;
      case 34: {
        message.ephemeralOffToOn = !!readByte(bb);
        break;
      }

      // optional bool ephemeralOutOfSync = 35;
      case 35: {
        message.ephemeralOutOfSync = !!readByte(bb);
        break;
      }

      // optional BizPrivacyStatus bizPrivacyStatus = 36;
      case 36: {
        var limit = pushTemporaryLength(bb);
        message.bizPrivacyStatus = _decodeBizPrivacyStatus(bb);
        bb.limit = limit;
        break;
      }

      // optional string verifiedBizName = 37;
      case 37: {
        message.verifiedBizName = readString(bb, readVarint32(bb));
        break;
      }

      // optional MediaData mediaData = 38;
      case 38: {
        var limit = pushTemporaryLength(bb);
        message.mediaData = _decodeMediaData(bb);
        bb.limit = limit;
        break;
      }

      // optional PhotoChange photoChange = 39;
      case 39: {
        var limit = pushTemporaryLength(bb);
        message.photoChange = _decodePhotoChange(bb);
        bb.limit = limit;
        break;
      }

      // repeated UserReceipt userReceipt = 40;
      case 40: {
        var limit = pushTemporaryLength(bb);
        var values = message.userReceipt || (message.userReceipt = []);
        values.push(_decodeUserReceipt(bb));
        bb.limit = limit;
        break;
      }

      // repeated Reaction reactions = 41;
      case 41: {
        var limit = pushTemporaryLength(bb);
        var values = message.reactions || (message.reactions = []);
        values.push(_decodeReaction(bb));
        bb.limit = limit;
        break;
      }

      // optional MediaData quotedStickerData = 42;
      case 42: {
        var limit = pushTemporaryLength(bb);
        message.quotedStickerData = _decodeMediaData(bb);
        bb.limit = limit;
        break;
      }

      // optional bytes futureproofData = 43;
      case 43: {
        message.futureproofData = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional StatusPSA statusPsa = 44;
      case 44: {
        var limit = pushTemporaryLength(bb);
        message.statusPsa = _decodeStatusPSA(bb);
        bb.limit = limit;
        break;
      }

      // repeated PollUpdate pollUpdates = 45;
      case 45: {
        var limit = pushTemporaryLength(bb);
        var values = message.pollUpdates || (message.pollUpdates = []);
        values.push(_decodePollUpdate(bb));
        bb.limit = limit;
        break;
      }

      // optional PollAdditionalMetadata pollAdditionalMetadata = 46;
      case 46: {
        var limit = pushTemporaryLength(bb);
        message.pollAdditionalMetadata = _decodePollAdditionalMetadata(bb);
        bb.limit = limit;
        break;
      }

      // optional string agentId = 47;
      case 47: {
        message.agentId = readString(bb, readVarint32(bb));
        break;
      }

      // optional bool statusAlreadyViewed = 48;
      case 48: {
        message.statusAlreadyViewed = !!readByte(bb);
        break;
      }

      // optional bytes messageSecret = 49;
      case 49: {
        message.messageSecret = readBytes(bb, readVarint32(bb));
        break;
      }

      // optional KeepInChat keepInChat = 50;
      case 50: {
        var limit = pushTemporaryLength(bb);
        message.keepInChat = _decodeKeepInChat(bb);
        bb.limit = limit;
        break;
      }

      // optional string originalSelfAuthorUserJidString = 51;
      case 51: {
        message.originalSelfAuthorUserJidString = readString(bb, readVarint32(bb));
        break;
      }

      // optional uint64 revokeMessageTimestamp = 52;
      case 52: {
        message.revokeMessageTimestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional PinInChat pinInChat = 54;
      case 54: {
        var limit = pushTemporaryLength(bb);
        message.pinInChat = _decodePinInChat(bb);
        bb.limit = limit;
        break;
      }

      // optional PremiumMessageInfo premiumMessageInfo = 55;
      case 55: {
        var limit = pushTemporaryLength(bb);
        message.premiumMessageInfo = _decodePremiumMessageInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional bool is1PBizBotMessage = 56;
      case 56: {
        message.is1PBizBotMessage = !!readByte(bb);
        break;
      }

      // optional bool isGroupHistoryMessage = 57;
      case 57: {
        message.isGroupHistoryMessage = !!readByte(bb);
        break;
      }

      // optional string botMessageInvokerJid = 58;
      case 58: {
        message.botMessageInvokerJid = readString(bb, readVarint32(bb));
        break;
      }

      // optional CommentMetadata commentMetadata = 59;
      case 59: {
        var limit = pushTemporaryLength(bb);
        message.commentMetadata = _decodeCommentMetadata(bb);
        bb.limit = limit;
        break;
      }

      // repeated EventResponse eventResponses = 61;
      case 61: {
        var limit = pushTemporaryLength(bb);
        var values = message.eventResponses || (message.eventResponses = []);
        values.push(_decodeEventResponse(bb));
        bb.limit = limit;
        break;
      }

      // optional ReportingTokenInfo reportingTokenInfo = 62;
      case 62: {
        var limit = pushTemporaryLength(bb);
        message.reportingTokenInfo = _decodeReportingTokenInfo(bb);
        bb.limit = limit;
        break;
      }

      // optional uint64 newsletterServerId = 63;
      case 63: {
        message.newsletterServerId = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional EventAdditionalMetadata eventAdditionalMetadata = 64;
      case 64: {
        var limit = pushTemporaryLength(bb);
        message.eventAdditionalMetadata = _decodeEventAdditionalMetadata(bb);
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  if (message.key === undefined)
    throw new Error("Missing required field: key");

  return message;
};

exports.encodeWebNotificationsInfo = function (message) {
  var bb = popByteBuffer();
  _encodeWebNotificationsInfo(message, bb);
  return toUint8Array(bb);
}

function _encodeWebNotificationsInfo(message, bb) {
  // optional uint64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    writeVarint32(bb, 16);
    writeVarint64(bb, $timestamp);
  }

  // optional uint32 unreadChats = 3;
  var $unreadChats = message.unreadChats;
  if ($unreadChats !== undefined) {
    writeVarint32(bb, 24);
    writeVarint32(bb, $unreadChats);
  }

  // optional uint32 notifyMessageCount = 4;
  var $notifyMessageCount = message.notifyMessageCount;
  if ($notifyMessageCount !== undefined) {
    writeVarint32(bb, 32);
    writeVarint32(bb, $notifyMessageCount);
  }

  // repeated WebMessageInfo notifyMessages = 5;
  var array$notifyMessages = message.notifyMessages;
  if (array$notifyMessages !== undefined) {
    for (var i = 0; i < array$notifyMessages.length; i++) {
      var value = array$notifyMessages[i];
      writeVarint32(bb, 42);
      var nested = popByteBuffer();
      _encodeWebMessageInfo(value, nested);
      writeVarint32(bb, nested.limit);
      writeByteBuffer(bb, nested);
      pushByteBuffer(nested);
    }
  }
};

exports.decodeWebNotificationsInfo = function (binary) {
  return _decodeWebNotificationsInfo(wrapByteBuffer(binary));
}

function _decodeWebNotificationsInfo(bb) {
  var message = {};

  end_of_message: while (!isAtEnd(bb)) {
    var tag = readVarint32(bb);

    switch (tag >>> 3) {
      case 0:
        break end_of_message;

      // optional uint64 timestamp = 2;
      case 2: {
        message.timestamp = readVarint64(bb, /* unsigned */ true);
        break;
      }

      // optional uint32 unreadChats = 3;
      case 3: {
        message.unreadChats = readVarint32(bb) >>> 0;
        break;
      }

      // optional uint32 notifyMessageCount = 4;
      case 4: {
        message.notifyMessageCount = readVarint32(bb) >>> 0;
        break;
      }

      // repeated WebMessageInfo notifyMessages = 5;
      case 5: {
        var limit = pushTemporaryLength(bb);
        var values = message.notifyMessages || (message.notifyMessages = []);
        values.push(_decodeWebMessageInfo(bb));
        bb.limit = limit;
        break;
      }

      default:
        skipUnknownField(bb, tag & 7);
    }
  }

  return message;
};

function pushTemporaryLength(bb) {
  var length = readVarint32(bb);
  var limit = bb.limit;
  bb.limit = bb.offset + length;
  return limit;
}

function skipUnknownField(bb, type) {
  switch (type) {
    case 0: while (readByte(bb) & 0x80) { } break;
    case 2: skip(bb, readVarint32(bb)); break;
    case 5: skip(bb, 4); break;
    case 1: skip(bb, 8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function stringToLong(value) {
  return {
    low: value.charCodeAt(0) | (value.charCodeAt(1) << 16),
    high: value.charCodeAt(2) | (value.charCodeAt(3) << 16),
    unsigned: false,
  };
}

function longToString(value) {
  var low = value.low;
  var high = value.high;
  return String.fromCharCode(
    low & 0xFFFF,
    low >>> 16,
    high & 0xFFFF,
    high >>> 16);
}

// The code below was modified from https://github.com/protobufjs/bytebuffer.js
// which is under the Apache License 2.0.

var f32 = new Float32Array(1);
var f32_u8 = new Uint8Array(f32.buffer);

var f64 = new Float64Array(1);
var f64_u8 = new Uint8Array(f64.buffer);

function intToLong(value) {
  value |= 0;
  return {
    low: value,
    high: value >> 31,
    unsigned: value >= 0,
  };
}

var bbStack = [];

function popByteBuffer() {
  const bb = bbStack.pop();
  if (!bb) return { bytes: new Uint8Array(64), offset: 0, limit: 0 };
  bb.offset = bb.limit = 0;
  return bb;
}

function pushByteBuffer(bb) {
  bbStack.push(bb);
}

function wrapByteBuffer(bytes) {
  return { bytes, offset: 0, limit: bytes.length };
}

function toUint8Array(bb) {
  var bytes = bb.bytes;
  var limit = bb.limit;
  return bytes.length === limit ? bytes : bytes.subarray(0, limit);
}

function skip(bb, offset) {
  if (bb.offset + offset > bb.limit) {
    throw new Error('Skip past limit');
  }
  bb.offset += offset;
}

function isAtEnd(bb) {
  return bb.offset >= bb.limit;
}

function grow(bb, count) {
  var bytes = bb.bytes;
  var offset = bb.offset;
  var limit = bb.limit;
  var finalOffset = offset + count;
  if (finalOffset > bytes.length) {
    var newBytes = new Uint8Array(finalOffset * 2);
    newBytes.set(bytes);
    bb.bytes = newBytes;
  }
  bb.offset = finalOffset;
  if (finalOffset > limit) {
    bb.limit = finalOffset;
  }
  return offset;
}

function advance(bb, count) {
  var offset = bb.offset;
  if (offset + count > bb.limit) {
    throw new Error('Read past limit');
  }
  bb.offset += count;
  return offset;
}

function readBytes(bb, count) {
  var offset = advance(bb, count);
  return bb.bytes.subarray(offset, offset + count);
}

function writeBytes(bb, buffer) {
  var offset = grow(bb, buffer.length);
  bb.bytes.set(buffer, offset);
}

function readString(bb, count) {
  // Sadly a hand-coded UTF8 decoder is much faster than subarray+TextDecoder in V8
  var offset = advance(bb, count);
  var fromCharCode = String.fromCharCode;
  var bytes = bb.bytes;
  var invalid = '\uFFFD';
  var text = '';

  for (var i = 0; i < count; i++) {
    var c1 = bytes[i + offset], c2, c3, c4, c;

    // 1 byte
    if ((c1 & 0x80) === 0) {
      text += fromCharCode(c1);
    }

    // 2 bytes
    else if ((c1 & 0xE0) === 0xC0) {
      if (i + 1 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        if ((c2 & 0xC0) !== 0x80) text += invalid;
        else {
          c = ((c1 & 0x1F) << 6) | (c2 & 0x3F);
          if (c < 0x80) text += invalid;
          else {
            text += fromCharCode(c);
            i++;
          }
        }
      }
    }

    // 3 bytes
    else if ((c1 & 0xF0) == 0xE0) {
      if (i + 2 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        if (((c2 | (c3 << 8)) & 0xC0C0) !== 0x8080) text += invalid;
        else {
          c = ((c1 & 0x0F) << 12) | ((c2 & 0x3F) << 6) | (c3 & 0x3F);
          if (c < 0x0800 || (c >= 0xD800 && c <= 0xDFFF)) text += invalid;
          else {
            text += fromCharCode(c);
            i += 2;
          }
        }
      }
    }

    // 4 bytes
    else if ((c1 & 0xF8) == 0xF0) {
      if (i + 3 >= count) text += invalid;
      else {
        c2 = bytes[i + offset + 1];
        c3 = bytes[i + offset + 2];
        c4 = bytes[i + offset + 3];
        if (((c2 | (c3 << 8) | (c4 << 16)) & 0xC0C0C0) !== 0x808080) text += invalid;
        else {
          c = ((c1 & 0x07) << 0x12) | ((c2 & 0x3F) << 0x0C) | ((c3 & 0x3F) << 0x06) | (c4 & 0x3F);
          if (c < 0x10000 || c > 0x10FFFF) text += invalid;
          else {
            c -= 0x10000;
            text += fromCharCode((c >> 10) + 0xD800, (c & 0x3FF) + 0xDC00);
            i += 3;
          }
        }
      }
    }

    else text += invalid;
  }

  return text;
}

function writeString(bb, text) {
  // Sadly a hand-coded UTF8 encoder is much faster than TextEncoder+set in V8
  var n = text.length;
  var byteCount = 0;

  // Write the byte count first
  for (var i = 0; i < n; i++) {
    var c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    byteCount += c < 0x80 ? 1 : c < 0x800 ? 2 : c < 0x10000 ? 3 : 4;
  }
  writeVarint32(bb, byteCount);

  var offset = grow(bb, byteCount);
  var bytes = bb.bytes;

  // Then write the bytes
  for (var i = 0; i < n; i++) {
    var c = text.charCodeAt(i);
    if (c >= 0xD800 && c <= 0xDBFF && i + 1 < n) {
      c = (c << 10) + text.charCodeAt(++i) - 0x35FDC00;
    }
    if (c < 0x80) {
      bytes[offset++] = c;
    } else {
      if (c < 0x800) {
        bytes[offset++] = ((c >> 6) & 0x1F) | 0xC0;
      } else {
        if (c < 0x10000) {
          bytes[offset++] = ((c >> 12) & 0x0F) | 0xE0;
        } else {
          bytes[offset++] = ((c >> 18) & 0x07) | 0xF0;
          bytes[offset++] = ((c >> 12) & 0x3F) | 0x80;
        }
        bytes[offset++] = ((c >> 6) & 0x3F) | 0x80;
      }
      bytes[offset++] = (c & 0x3F) | 0x80;
    }
  }
}

function writeByteBuffer(bb, buffer) {
  var offset = grow(bb, buffer.limit);
  var from = bb.bytes;
  var to = buffer.bytes;

  // This for loop is much faster than subarray+set on V8
  for (var i = 0, n = buffer.limit; i < n; i++) {
    from[i + offset] = to[i];
  }
}

function readByte(bb) {
  return bb.bytes[advance(bb, 1)];
}

function writeByte(bb, value) {
  var offset = grow(bb, 1);
  bb.bytes[offset] = value;
}

function readFloat(bb) {
  var offset = advance(bb, 4);
  var bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f32_u8[0] = bytes[offset++];
  f32_u8[1] = bytes[offset++];
  f32_u8[2] = bytes[offset++];
  f32_u8[3] = bytes[offset++];
  return f32[0];
}

function writeFloat(bb, value) {
  var offset = grow(bb, 4);
  var bytes = bb.bytes;
  f32[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f32_u8[0];
  bytes[offset++] = f32_u8[1];
  bytes[offset++] = f32_u8[2];
  bytes[offset++] = f32_u8[3];
}

function readDouble(bb) {
  var offset = advance(bb, 8);
  var bytes = bb.bytes;

  // Manual copying is much faster than subarray+set in V8
  f64_u8[0] = bytes[offset++];
  f64_u8[1] = bytes[offset++];
  f64_u8[2] = bytes[offset++];
  f64_u8[3] = bytes[offset++];
  f64_u8[4] = bytes[offset++];
  f64_u8[5] = bytes[offset++];
  f64_u8[6] = bytes[offset++];
  f64_u8[7] = bytes[offset++];
  return f64[0];
}

function writeDouble(bb, value) {
  var offset = grow(bb, 8);
  var bytes = bb.bytes;
  f64[0] = value;

  // Manual copying is much faster than subarray+set in V8
  bytes[offset++] = f64_u8[0];
  bytes[offset++] = f64_u8[1];
  bytes[offset++] = f64_u8[2];
  bytes[offset++] = f64_u8[3];
  bytes[offset++] = f64_u8[4];
  bytes[offset++] = f64_u8[5];
  bytes[offset++] = f64_u8[6];
  bytes[offset++] = f64_u8[7];
}

function readInt32(bb) {
  var offset = advance(bb, 4);
  var bytes = bb.bytes;
  return (
    bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16) |
    (bytes[offset + 3] << 24)
  );
}

function writeInt32(bb, value) {
  var offset = grow(bb, 4);
  var bytes = bb.bytes;
  bytes[offset] = value;
  bytes[offset + 1] = value >> 8;
  bytes[offset + 2] = value >> 16;
  bytes[offset + 3] = value >> 24;
}

function readInt64(bb, unsigned) {
  return {
    low: readInt32(bb),
    high: readInt32(bb),
    unsigned,
  };
}

function writeInt64(bb, value) {
  writeInt32(bb, value.low);
  writeInt32(bb, value.high);
}

function readVarint32(bb) {
  var c = 0;
  var value = 0;
  var b;
  do {
    b = readByte(bb);
    if (c < 32) value |= (b & 0x7F) << c;
    c += 7;
  } while (b & 0x80);
  return value;
}

function writeVarint32(bb, value) {
  value >>>= 0;
  while (value >= 0x80) {
    writeByte(bb, (value & 0x7f) | 0x80);
    value >>>= 7;
  }
  writeByte(bb, value);
}

function readVarint64(bb, unsigned) {
  var part0 = 0;
  var part1 = 0;
  var part2 = 0;
  var b;

  b = readByte(bb); part0 = (b & 0x7F); if (b & 0x80) {
    b = readByte(bb); part0 |= (b & 0x7F) << 7; if (b & 0x80) {
      b = readByte(bb); part0 |= (b & 0x7F) << 14; if (b & 0x80) {
        b = readByte(bb); part0 |= (b & 0x7F) << 21; if (b & 0x80) {

          b = readByte(bb); part1 = (b & 0x7F); if (b & 0x80) {
            b = readByte(bb); part1 |= (b & 0x7F) << 7; if (b & 0x80) {
              b = readByte(bb); part1 |= (b & 0x7F) << 14; if (b & 0x80) {
                b = readByte(bb); part1 |= (b & 0x7F) << 21; if (b & 0x80) {

                  b = readByte(bb); part2 = (b & 0x7F); if (b & 0x80) {
                    b = readByte(bb); part2 |= (b & 0x7F) << 7;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return {
    low: part0 | (part1 << 28),
    high: (part1 >>> 4) | (part2 << 24),
    unsigned,
  };
}

function writeVarint64(bb, value) {
  var part0 = value.low >>> 0;
  var part1 = ((value.low >>> 28) | (value.high << 4)) >>> 0;
  var part2 = value.high >>> 24;

  // ref: src/google/protobuf/io/coded_stream.cc
  var size =
    part2 === 0 ?
      part1 === 0 ?
        part0 < 1 << 14 ?
          part0 < 1 << 7 ? 1 : 2 :
          part0 < 1 << 21 ? 3 : 4 :
        part1 < 1 << 14 ?
          part1 < 1 << 7 ? 5 : 6 :
          part1 < 1 << 21 ? 7 : 8 :
      part2 < 1 << 7 ? 9 : 10;

  var offset = grow(bb, size);
  var bytes = bb.bytes;

  switch (size) {
    case 10: bytes[offset + 9] = (part2 >>> 7) & 0x01;
    case 9: bytes[offset + 8] = size !== 9 ? part2 | 0x80 : part2 & 0x7F;
    case 8: bytes[offset + 7] = size !== 8 ? (part1 >>> 21) | 0x80 : (part1 >>> 21) & 0x7F;
    case 7: bytes[offset + 6] = size !== 7 ? (part1 >>> 14) | 0x80 : (part1 >>> 14) & 0x7F;
    case 6: bytes[offset + 5] = size !== 6 ? (part1 >>> 7) | 0x80 : (part1 >>> 7) & 0x7F;
    case 5: bytes[offset + 4] = size !== 5 ? part1 | 0x80 : part1 & 0x7F;
    case 4: bytes[offset + 3] = size !== 4 ? (part0 >>> 21) | 0x80 : (part0 >>> 21) & 0x7F;
    case 3: bytes[offset + 2] = size !== 3 ? (part0 >>> 14) | 0x80 : (part0 >>> 14) & 0x7F;
    case 2: bytes[offset + 1] = size !== 2 ? (part0 >>> 7) | 0x80 : (part0 >>> 7) & 0x7F;
    case 1: bytes[offset] = size !== 1 ? part0 | 0x80 : part0 & 0x7F;
  }
}

function readVarint32ZigZag(bb) {
  var value = readVarint32(bb);

  // ref: src/google/protobuf/wire_format_lite.h
  return (value >>> 1) ^ -(value & 1);
}

function writeVarint32ZigZag(bb, value) {
  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint32(bb, (value << 1) ^ (value >> 31));
}

function readVarint64ZigZag(bb) {
  var value = readVarint64(bb, /* unsigned */ false);
  var low = value.low;
  var high = value.high;
  var flip = -(low & 1);

  // ref: src/google/protobuf/wire_format_lite.h
  return {
    low: ((low >>> 1) | (high << 31)) ^ flip,
    high: (high >>> 1) ^ flip,
    unsigned: false,
  };
}

function writeVarint64ZigZag(bb, value) {
  var low = value.low;
  var high = value.high;
  var flip = high >> 31;

  // ref: src/google/protobuf/wire_format_lite.h
  writeVarint64(bb, {
    low: (low << 1) ^ flip,
    high: ((high << 1) | (low >>> 31)) ^ flip,
    unsigned: false,
  });
}
