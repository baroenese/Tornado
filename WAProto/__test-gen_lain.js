var proto = proto || exports || {}, exports;
var ByteBuffer = ByteBuffer || require("bytebuffer");
proto.Long = ByteBuffer.Long;

(function(undefined) {

function $pushTemporaryLength(buffer) {
  var length = buffer.readVarint32();
  var limit = buffer.limit;
  buffer.limit = buffer.offset + length;
  return limit;
}

function $skipUnknownField(buffer, type) {
  switch (type) {
    case 0: while (buffer.readByte() & 0x80) {} break;
    case 2: buffer.skip(buffer.readVarint32()); break;
    case 5: buffer.skip(4); break;
    case 1: buffer.skip(8); break;
    default: throw new Error("Unimplemented type: " + type);
  }
}

function $coerceLong(value) {
  if (!(value instanceof ByteBuffer.Long) && "low" in value && "high" in value)
    value = new ByteBuffer.Long(value.low, value.high, value.unsigned);
  return value;
}

proto.encodeADVEncryptionType = {
  E2EE: 0,
  HOSTED: 1,
};

proto.decodeADVEncryptionType = {
  0: "E2EE",
  1: "HOSTED",
};

proto.encodeKeepType = {
  UNKNOWN: 0,
  KEEP_FOR_ALL: 1,
  UNDO_KEEP_FOR_ALL: 2,
};

proto.decodeKeepType = {
  0: "UNKNOWN",
  1: "KEEP_FOR_ALL",
  2: "UNDO_KEEP_FOR_ALL",
};

proto.encodeMediaVisibility = {
  DEFAULT: 0,
  OFF: 1,
  ON: 2,
};

proto.decodeMediaVisibility = {
  0: "DEFAULT",
  1: "OFF",
  2: "ON",
};

proto.encodeADVDeviceIdentity = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 rawId = 1;
  var $rawId = message.rawId;
  if ($rawId !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($rawId);
  }

  // optional uint64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($timestamp));
  }

  // optional uint32 keyIndex = 3;
  var $keyIndex = message.keyIndex;
  if ($keyIndex !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32($keyIndex);
  }

  // optional ADVEncryptionType accountType = 4;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint32(proto.encodeADVEncryptionType[$accountType]);
  }

  // optional ADVEncryptionType deviceType = 5;
  var $deviceType = message.deviceType;
  if ($deviceType !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32(proto.encodeADVEncryptionType[$deviceType]);
  }

  return buffer.flip().toBuffer();
};

proto.decodeADVDeviceIdentity = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 rawId = 1;
    case 1: {
      message.rawId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint64 timestamp = 2;
    case 2: {
      message.timestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint32 keyIndex = 3;
    case 3: {
      message.keyIndex = buffer.readVarint32() >>> 0;
      break;
    }

    // optional ADVEncryptionType accountType = 4;
    case 4: {
      message.accountType = proto.decodeADVEncryptionType[buffer.readVarint32()];
      break;
    }

    // optional ADVEncryptionType deviceType = 5;
    case 5: {
      message.deviceType = proto.decodeADVEncryptionType[buffer.readVarint32()];
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeADVKeyIndexList = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 rawId = 1;
  var $rawId = message.rawId;
  if ($rawId !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($rawId);
  }

  // optional uint64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($timestamp));
  }

  // optional uint32 currentIndex = 3;
  var $currentIndex = message.currentIndex;
  if ($currentIndex !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32($currentIndex);
  }

  // repeated uint32 validIndexes = 4;
  var array$validIndexes = message.validIndexes;
  if (array$validIndexes !== undefined) {
    var packed = new ByteBuffer(undefined, /* isLittleEndian */ true);
    for (var i = 0; i < array$validIndexes.length; i++) {
      var $validIndexes = array$validIndexes[i];
      packed.writeVarint32($validIndexes);
    }
    buffer.writeVarint32(34);
    buffer.writeVarint32(packed.flip().limit);
    buffer.append(packed);
  }

  // optional ADVEncryptionType accountType = 5;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32(proto.encodeADVEncryptionType[$accountType]);
  }

  return buffer.flip().toBuffer();
};

proto.decodeADVKeyIndexList = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 rawId = 1;
    case 1: {
      message.rawId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint64 timestamp = 2;
    case 2: {
      message.timestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint32 currentIndex = 3;
    case 3: {
      message.currentIndex = buffer.readVarint32() >>> 0;
      break;
    }

    // repeated uint32 validIndexes = 4;
    case 4: {
      var values = message.validIndexes || (message.validIndexes = []);
      if ((tag & 7) === 2) {
        var outerLimit = $pushTemporaryLength(buffer);
        while (buffer.remaining() > 0) {
          values.push(buffer.readVarint32() >>> 0);
        }
        buffer.limit = outerLimit;
      } else {
        values.push(buffer.readVarint32() >>> 0);
      }
      break;
    }

    // optional ADVEncryptionType accountType = 5;
    case 5: {
      message.accountType = proto.decodeADVEncryptionType[buffer.readVarint32()];
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeADVSignedDeviceIdentity = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($details.length), buffer.append($details);
  }

  // optional bytes accountSignatureKey = 2;
  var $accountSignatureKey = message.accountSignatureKey;
  if ($accountSignatureKey !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($accountSignatureKey.length), buffer.append($accountSignatureKey);
  }

  // optional bytes accountSignature = 3;
  var $accountSignature = message.accountSignature;
  if ($accountSignature !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($accountSignature.length), buffer.append($accountSignature);
  }

  // optional bytes deviceSignature = 4;
  var $deviceSignature = message.deviceSignature;
  if ($deviceSignature !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($deviceSignature.length), buffer.append($deviceSignature);
  }

  return buffer.flip().toBuffer();
};

proto.decodeADVSignedDeviceIdentity = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes details = 1;
    case 1: {
      message.details = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes accountSignatureKey = 2;
    case 2: {
      message.accountSignatureKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes accountSignature = 3;
    case 3: {
      message.accountSignature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes deviceSignature = 4;
    case 4: {
      message.deviceSignature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeADVSignedDeviceIdentityHMAC = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($details.length), buffer.append($details);
  }

  // optional bytes hmac = 2;
  var $hmac = message.hmac;
  if ($hmac !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($hmac.length), buffer.append($hmac);
  }

  // optional ADVEncryptionType accountType = 3;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32(proto.encodeADVEncryptionType[$accountType]);
  }

  return buffer.flip().toBuffer();
};

proto.decodeADVSignedDeviceIdentityHMAC = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes details = 1;
    case 1: {
      message.details = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes hmac = 2;
    case 2: {
      message.hmac = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional ADVEncryptionType accountType = 3;
    case 3: {
      message.accountType = proto.decodeADVEncryptionType[buffer.readVarint32()];
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeADVSignedKeyIndexList = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($details.length), buffer.append($details);
  }

  // optional bytes accountSignature = 2;
  var $accountSignature = message.accountSignature;
  if ($accountSignature !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($accountSignature.length), buffer.append($accountSignature);
  }

  // optional bytes accountSignatureKey = 3;
  var $accountSignatureKey = message.accountSignatureKey;
  if ($accountSignatureKey !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($accountSignatureKey.length), buffer.append($accountSignatureKey);
  }

  return buffer.flip().toBuffer();
};

proto.decodeADVSignedKeyIndexList = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes details = 1;
    case 1: {
      message.details = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes accountSignature = 2;
    case 2: {
      message.accountSignature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes accountSignatureKey = 3;
    case 3: {
      message.accountSignatureKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeActionLink = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string url = 1;
  var $url = message.url;
  if ($url !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($url), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string buttonTitle = 2;
  var $buttonTitle = message.buttonTitle;
  if ($buttonTitle !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($buttonTitle), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeActionLink = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string url = 1;
    case 1: {
      message.url = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string buttonTitle = 2;
    case 2: {
      message.buttonTitle = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeAutoDownloadSettings = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bool downloadImages = 1;
  var $downloadImages = message.downloadImages;
  if ($downloadImages !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeByte($downloadImages ? 1 : 0);
  }

  // optional bool downloadAudio = 2;
  var $downloadAudio = message.downloadAudio;
  if ($downloadAudio !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeByte($downloadAudio ? 1 : 0);
  }

  // optional bool downloadVideo = 3;
  var $downloadVideo = message.downloadVideo;
  if ($downloadVideo !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeByte($downloadVideo ? 1 : 0);
  }

  // optional bool downloadDocuments = 4;
  var $downloadDocuments = message.downloadDocuments;
  if ($downloadDocuments !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeByte($downloadDocuments ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeAutoDownloadSettings = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bool downloadImages = 1;
    case 1: {
      message.downloadImages = !!buffer.readByte();
      break;
    }

    // optional bool downloadAudio = 2;
    case 2: {
      message.downloadAudio = !!buffer.readByte();
      break;
    }

    // optional bool downloadVideo = 3;
    case 3: {
      message.downloadVideo = !!buffer.readByte();
      break;
    }

    // optional bool downloadDocuments = 4;
    case 4: {
      message.downloadDocuments = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeAvatarUserSettings = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string fbid = 1;
  var $fbid = message.fbid;
  if ($fbid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($fbid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string password = 2;
  var $password = message.password;
  if ($password !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($password), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeAvatarUserSettings = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string fbid = 1;
    case 1: {
      message.fbid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string password = 2;
    case 2: {
      message.password = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBizAccountLinkInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint64 whatsappBizAcctFbid = 1;
  var $whatsappBizAcctFbid = message.whatsappBizAcctFbid;
  if ($whatsappBizAcctFbid !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint64($coerceLong($whatsappBizAcctFbid));
  }

  // optional string whatsappAcctNumber = 2;
  var $whatsappAcctNumber = message.whatsappAcctNumber;
  if ($whatsappAcctNumber !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($whatsappAcctNumber), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint64 issueTime = 3;
  var $issueTime = message.issueTime;
  if ($issueTime !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($issueTime));
  }

  // optional HostStorageType hostStorage = 4;
  var $hostStorage = message.hostStorage;
  if ($hostStorage !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeHostStorageType($hostStorage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional AccountType accountType = 5;
  var $accountType = message.accountType;
  if ($accountType !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeAccountType($accountType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeBizAccountLinkInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint64 whatsappBizAcctFbid = 1;
    case 1: {
      message.whatsappBizAcctFbid = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional string whatsappAcctNumber = 2;
    case 2: {
      message.whatsappAcctNumber = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint64 issueTime = 3;
    case 3: {
      message.issueTime = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional HostStorageType hostStorage = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.hostStorage = proto.decodeHostStorageType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional AccountType accountType = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.accountType = proto.decodeAccountType(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBizAccountPayload = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional VerifiedNameCertificate vnameCert = 1;
  var $vnameCert = message.vnameCert;
  if ($vnameCert !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeVerifiedNameCertificate($vnameCert);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bytes bizAcctLinkInfo = 2;
  var $bizAcctLinkInfo = message.bizAcctLinkInfo;
  if ($bizAcctLinkInfo !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($bizAcctLinkInfo.length), buffer.append($bizAcctLinkInfo);
  }

  return buffer.flip().toBuffer();
};

proto.decodeBizAccountPayload = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional VerifiedNameCertificate vnameCert = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.vnameCert = proto.decodeVerifiedNameCertificate(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bytes bizAcctLinkInfo = 2;
    case 2: {
      message.bizAcctLinkInfo = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBizIdentityInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional VerifiedLevelValue vlevel = 1;
  var $vlevel = message.vlevel;
  if ($vlevel !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeVerifiedLevelValue($vlevel);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional VerifiedNameCertificate vnameCert = 2;
  var $vnameCert = message.vnameCert;
  if ($vnameCert !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeVerifiedNameCertificate($vnameCert);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool signed = 3;
  var $signed = message.signed;
  if ($signed !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeByte($signed ? 1 : 0);
  }

  // optional bool revoked = 4;
  var $revoked = message.revoked;
  if ($revoked !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeByte($revoked ? 1 : 0);
  }

  // optional HostStorageType hostStorage = 5;
  var $hostStorage = message.hostStorage;
  if ($hostStorage !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeHostStorageType($hostStorage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ActualActorsType actualActors = 6;
  var $actualActors = message.actualActors;
  if ($actualActors !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeActualActorsType($actualActors);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 privacyModeTs = 7;
  var $privacyModeTs = message.privacyModeTs;
  if ($privacyModeTs !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeVarint64($coerceLong($privacyModeTs));
  }

  // optional uint64 featureControls = 8;
  var $featureControls = message.featureControls;
  if ($featureControls !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeVarint64($coerceLong($featureControls));
  }

  return buffer.flip().toBuffer();
};

proto.decodeBizIdentityInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional VerifiedLevelValue vlevel = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.vlevel = proto.decodeVerifiedLevelValue(buffer);
      buffer.limit = limit;
      break;
    }

    // optional VerifiedNameCertificate vnameCert = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.vnameCert = proto.decodeVerifiedNameCertificate(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool signed = 3;
    case 3: {
      message.signed = !!buffer.readByte();
      break;
    }

    // optional bool revoked = 4;
    case 4: {
      message.revoked = !!buffer.readByte();
      break;
    }

    // optional HostStorageType hostStorage = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.hostStorage = proto.decodeHostStorageType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ActualActorsType actualActors = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.actualActors = proto.decodeActualActorsType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 privacyModeTs = 7;
    case 7: {
      message.privacyModeTs = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint64 featureControls = 8;
    case 8: {
      message.featureControls = buffer.readVarint64().toUnsigned();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBotAvatarMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 sentiment = 1;
  var $sentiment = message.sentiment;
  if ($sentiment !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($sentiment);
  }

  // optional string behaviorGraph = 2;
  var $behaviorGraph = message.behaviorGraph;
  if ($behaviorGraph !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($behaviorGraph), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint32 action = 3;
  var $action = message.action;
  if ($action !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32($action);
  }

  // optional uint32 intensity = 4;
  var $intensity = message.intensity;
  if ($intensity !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint32($intensity);
  }

  // optional uint32 wordCount = 5;
  var $wordCount = message.wordCount;
  if ($wordCount !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32($wordCount);
  }

  return buffer.flip().toBuffer();
};

proto.decodeBotAvatarMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 sentiment = 1;
    case 1: {
      message.sentiment = buffer.readVarint32() >>> 0;
      break;
    }

    // optional string behaviorGraph = 2;
    case 2: {
      message.behaviorGraph = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint32 action = 3;
    case 3: {
      message.action = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 intensity = 4;
    case 4: {
      message.intensity = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 wordCount = 5;
    case 5: {
      message.wordCount = buffer.readVarint32() >>> 0;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBotMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional BotAvatarMetadata avatarMetadata = 1;
  var $avatarMetadata = message.avatarMetadata;
  if ($avatarMetadata !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeBotAvatarMetadata($avatarMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string personaId = 2;
  var $personaId = message.personaId;
  if ($personaId !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($personaId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional BotPluginMetadata pluginMetadata = 3;
  var $pluginMetadata = message.pluginMetadata;
  if ($pluginMetadata !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeBotPluginMetadata($pluginMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional BotSuggestedPromptMetadata suggestedPromptMetadata = 4;
  var $suggestedPromptMetadata = message.suggestedPromptMetadata;
  if ($suggestedPromptMetadata !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeBotSuggestedPromptMetadata($suggestedPromptMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string invokerJid = 5;
  var $invokerJid = message.invokerJid;
  if ($invokerJid !== undefined) {
    buffer.writeVarint32(42);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($invokerJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional BotSearchMetadata searchMetadata = 6;
  var $searchMetadata = message.searchMetadata;
  if ($searchMetadata !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeBotSearchMetadata($searchMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeBotMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional BotAvatarMetadata avatarMetadata = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.avatarMetadata = proto.decodeBotAvatarMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string personaId = 2;
    case 2: {
      message.personaId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional BotPluginMetadata pluginMetadata = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.pluginMetadata = proto.decodeBotPluginMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    // optional BotSuggestedPromptMetadata suggestedPromptMetadata = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.suggestedPromptMetadata = proto.decodeBotSuggestedPromptMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string invokerJid = 5;
    case 5: {
      message.invokerJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional BotSearchMetadata searchMetadata = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.searchMetadata = proto.decodeBotSearchMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBotPluginMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional SearchProvider provider = 1;
  var $provider = message.provider;
  if ($provider !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeSearchProvider($provider);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PluginType pluginType = 2;
  var $pluginType = message.pluginType;
  if ($pluginType !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodePluginType($pluginType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string thumbnailCdnUrl = 3;
  var $thumbnailCdnUrl = message.thumbnailCdnUrl;
  if ($thumbnailCdnUrl !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($thumbnailCdnUrl), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string profilePhotoCdnUrl = 4;
  var $profilePhotoCdnUrl = message.profilePhotoCdnUrl;
  if ($profilePhotoCdnUrl !== undefined) {
    buffer.writeVarint32(34);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($profilePhotoCdnUrl), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string searchProviderUrl = 5;
  var $searchProviderUrl = message.searchProviderUrl;
  if ($searchProviderUrl !== undefined) {
    buffer.writeVarint32(42);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($searchProviderUrl), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint32 referenceIndex = 6;
  var $referenceIndex = message.referenceIndex;
  if ($referenceIndex !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeVarint32($referenceIndex);
  }

  // optional uint32 expectedLinksCount = 7;
  var $expectedLinksCount = message.expectedLinksCount;
  if ($expectedLinksCount !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeVarint32($expectedLinksCount);
  }

  // optional string searchQuery = 9;
  var $searchQuery = message.searchQuery;
  if ($searchQuery !== undefined) {
    buffer.writeVarint32(74);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($searchQuery), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional MessageKey parentPluginMessageKey = 10;
  var $parentPluginMessageKey = message.parentPluginMessageKey;
  if ($parentPluginMessageKey !== undefined) {
    buffer.writeVarint32(82);
    var nested = proto.encodeMessageKey($parentPluginMessageKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeBotPluginMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional SearchProvider provider = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.provider = proto.decodeSearchProvider(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PluginType pluginType = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.pluginType = proto.decodePluginType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string thumbnailCdnUrl = 3;
    case 3: {
      message.thumbnailCdnUrl = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string profilePhotoCdnUrl = 4;
    case 4: {
      message.profilePhotoCdnUrl = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string searchProviderUrl = 5;
    case 5: {
      message.searchProviderUrl = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint32 referenceIndex = 6;
    case 6: {
      message.referenceIndex = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 expectedLinksCount = 7;
    case 7: {
      message.expectedLinksCount = buffer.readVarint32() >>> 0;
      break;
    }

    // optional string searchQuery = 9;
    case 9: {
      message.searchQuery = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional MessageKey parentPluginMessageKey = 10;
    case 10: {
      var limit = $pushTemporaryLength(buffer);
      message.parentPluginMessageKey = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBotSearchMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string sessionId = 1;
  var $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($sessionId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeBotSearchMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string sessionId = 1;
    case 1: {
      message.sessionId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeBotSuggestedPromptMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // repeated string suggestedPrompts = 1;
  var array$suggestedPrompts = message.suggestedPrompts;
  if (array$suggestedPrompts !== undefined) {
    for (var i = 0; i < array$suggestedPrompts.length; i++) {
      var $suggestedPrompts = array$suggestedPrompts[i];
      var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
      buffer.writeVarint32(10);
      nested.writeUTF8String($suggestedPrompts), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
    }
  }

  // optional uint32 selectedPromptIndex = 2;
  var $selectedPromptIndex = message.selectedPromptIndex;
  if ($selectedPromptIndex !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32($selectedPromptIndex);
  }

  return buffer.flip().toBuffer();
};

proto.decodeBotSuggestedPromptMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // repeated string suggestedPrompts = 1;
    case 1: {
      var values = message.suggestedPrompts || (message.suggestedPrompts = []);
      values.push(buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES));
      break;
    }

    // optional uint32 selectedPromptIndex = 2;
    case 2: {
      message.selectedPromptIndex = buffer.readVarint32() >>> 0;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeCallLogRecord = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional CallResult callResult = 1;
  var $callResult = message.callResult;
  if ($callResult !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeCallResult($callResult);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool isDndMode = 2;
  var $isDndMode = message.isDndMode;
  if ($isDndMode !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeByte($isDndMode ? 1 : 0);
  }

  // optional SilenceReason silenceReason = 3;
  var $silenceReason = message.silenceReason;
  if ($silenceReason !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeSilenceReason($silenceReason);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional int64 duration = 4;
  var $duration = message.duration;
  if ($duration !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint64($coerceLong($duration));
  }

  // optional int64 startTime = 5;
  var $startTime = message.startTime;
  if ($startTime !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint64($coerceLong($startTime));
  }

  // optional bool isIncoming = 6;
  var $isIncoming = message.isIncoming;
  if ($isIncoming !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeByte($isIncoming ? 1 : 0);
  }

  // optional bool isVideo = 7;
  var $isVideo = message.isVideo;
  if ($isVideo !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeByte($isVideo ? 1 : 0);
  }

  // optional bool isCallLink = 8;
  var $isCallLink = message.isCallLink;
  if ($isCallLink !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeByte($isCallLink ? 1 : 0);
  }

  // optional string callLinkToken = 9;
  var $callLinkToken = message.callLinkToken;
  if ($callLinkToken !== undefined) {
    buffer.writeVarint32(74);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($callLinkToken), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string scheduledCallId = 10;
  var $scheduledCallId = message.scheduledCallId;
  if ($scheduledCallId !== undefined) {
    buffer.writeVarint32(82);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($scheduledCallId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string callId = 11;
  var $callId = message.callId;
  if ($callId !== undefined) {
    buffer.writeVarint32(90);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($callId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string callCreatorJid = 12;
  var $callCreatorJid = message.callCreatorJid;
  if ($callCreatorJid !== undefined) {
    buffer.writeVarint32(98);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($callCreatorJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string groupJid = 13;
  var $groupJid = message.groupJid;
  if ($groupJid !== undefined) {
    buffer.writeVarint32(106);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($groupJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // repeated ParticipantInfo participants = 14;
  var array$participants = message.participants;
  if (array$participants !== undefined) {
    for (var i = 0; i < array$participants.length; i++) {
      var $participants = array$participants[i];
      var nested = proto.encodeParticipantInfo($participants);
      buffer.writeVarint32(114);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional CallType callType = 15;
  var $callType = message.callType;
  if ($callType !== undefined) {
    buffer.writeVarint32(122);
    var nested = proto.encodeCallType($callType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeCallLogRecord = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional CallResult callResult = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.callResult = proto.decodeCallResult(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool isDndMode = 2;
    case 2: {
      message.isDndMode = !!buffer.readByte();
      break;
    }

    // optional SilenceReason silenceReason = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.silenceReason = proto.decodeSilenceReason(buffer);
      buffer.limit = limit;
      break;
    }

    // optional int64 duration = 4;
    case 4: {
      message.duration = buffer.readVarint64();
      break;
    }

    // optional int64 startTime = 5;
    case 5: {
      message.startTime = buffer.readVarint64();
      break;
    }

    // optional bool isIncoming = 6;
    case 6: {
      message.isIncoming = !!buffer.readByte();
      break;
    }

    // optional bool isVideo = 7;
    case 7: {
      message.isVideo = !!buffer.readByte();
      break;
    }

    // optional bool isCallLink = 8;
    case 8: {
      message.isCallLink = !!buffer.readByte();
      break;
    }

    // optional string callLinkToken = 9;
    case 9: {
      message.callLinkToken = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string scheduledCallId = 10;
    case 10: {
      message.scheduledCallId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string callId = 11;
    case 11: {
      message.callId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string callCreatorJid = 12;
    case 12: {
      message.callCreatorJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string groupJid = 13;
    case 13: {
      message.groupJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // repeated ParticipantInfo participants = 14;
    case 14: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.participants || (message.participants = []);
      values.push(proto.decodeParticipantInfo(buffer));
      buffer.limit = limit;
      break;
    }

    // optional CallType callType = 15;
    case 15: {
      var limit = $pushTemporaryLength(buffer);
      message.callType = proto.decodeCallType(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeCertChain = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional NoiseCertificate leaf = 1;
  var $leaf = message.leaf;
  if ($leaf !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeNoiseCertificate($leaf);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional NoiseCertificate intermediate = 2;
  var $intermediate = message.intermediate;
  if ($intermediate !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeNoiseCertificate($intermediate);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeCertChain = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional NoiseCertificate leaf = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.leaf = proto.decodeNoiseCertificate(buffer);
      buffer.limit = limit;
      break;
    }

    // optional NoiseCertificate intermediate = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.intermediate = proto.decodeNoiseCertificate(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeChatLockSettings = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bool hideLockedChats = 1;
  var $hideLockedChats = message.hideLockedChats;
  if ($hideLockedChats !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeByte($hideLockedChats ? 1 : 0);
  }

  // optional UserPassword secretCode = 2;
  var $secretCode = message.secretCode;
  if ($secretCode !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeUserPassword($secretCode);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeChatLockSettings = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bool hideLockedChats = 1;
    case 1: {
      message.hideLockedChats = !!buffer.readByte();
      break;
    }

    // optional UserPassword secretCode = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.secretCode = proto.decodeUserPassword(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeChatRowOpaqueData = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional DraftMessage draftMessage = 1;
  var $draftMessage = message.draftMessage;
  if ($draftMessage !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeDraftMessage($draftMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeChatRowOpaqueData = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional DraftMessage draftMessage = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.draftMessage = proto.decodeDraftMessage(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeClientPayload = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint64 username = 1;
  var $username = message.username;
  if ($username !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint64($coerceLong($username));
  }

  // optional bool passive = 3;
  var $passive = message.passive;
  if ($passive !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeByte($passive ? 1 : 0);
  }

  // optional UserAgent userAgent = 5;
  var $userAgent = message.userAgent;
  if ($userAgent !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeUserAgent($userAgent);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional WebInfo webInfo = 6;
  var $webInfo = message.webInfo;
  if ($webInfo !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeWebInfo($webInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string pushName = 7;
  var $pushName = message.pushName;
  if ($pushName !== undefined) {
    buffer.writeVarint32(58);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pushName), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional sfixed32 sessionId = 9;
  var $sessionId = message.sessionId;
  if ($sessionId !== undefined) {
    buffer.writeVarint32(77);
    buffer.writeInt32($sessionId);
  }

  // optional bool shortConnect = 10;
  var $shortConnect = message.shortConnect;
  if ($shortConnect !== undefined) {
    buffer.writeVarint32(80);
    buffer.writeByte($shortConnect ? 1 : 0);
  }

  // optional ConnectType connectType = 12;
  var $connectType = message.connectType;
  if ($connectType !== undefined) {
    buffer.writeVarint32(98);
    var nested = proto.encodeConnectType($connectType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ConnectReason connectReason = 13;
  var $connectReason = message.connectReason;
  if ($connectReason !== undefined) {
    buffer.writeVarint32(106);
    var nested = proto.encodeConnectReason($connectReason);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated int32 shards = 14;
  var array$shards = message.shards;
  if (array$shards !== undefined) {
    var packed = new ByteBuffer(undefined, /* isLittleEndian */ true);
    for (var i = 0; i < array$shards.length; i++) {
      var $shards = array$shards[i];
      packed.writeVarint64($shards | 0);
    }
    buffer.writeVarint32(114);
    buffer.writeVarint32(packed.flip().limit);
    buffer.append(packed);
  }

  // optional DNSSource dnsSource = 15;
  var $dnsSource = message.dnsSource;
  if ($dnsSource !== undefined) {
    buffer.writeVarint32(122);
    var nested = proto.encodeDNSSource($dnsSource);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint32 connectAttemptCount = 16;
  var $connectAttemptCount = message.connectAttemptCount;
  if ($connectAttemptCount !== undefined) {
    buffer.writeVarint32(128);
    buffer.writeVarint32($connectAttemptCount);
  }

  // optional uint32 device = 18;
  var $device = message.device;
  if ($device !== undefined) {
    buffer.writeVarint32(144);
    buffer.writeVarint32($device);
  }

  // optional DevicePairingRegistrationData devicePairingData = 19;
  var $devicePairingData = message.devicePairingData;
  if ($devicePairingData !== undefined) {
    buffer.writeVarint32(154);
    var nested = proto.encodeDevicePairingRegistrationData($devicePairingData);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Product product = 20;
  var $product = message.product;
  if ($product !== undefined) {
    buffer.writeVarint32(162);
    var nested = proto.encodeProduct($product);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bytes fbCat = 21;
  var $fbCat = message.fbCat;
  if ($fbCat !== undefined) {
    buffer.writeVarint32(170);
    buffer.writeVarint32($fbCat.length), buffer.append($fbCat);
  }

  // optional bytes fbUserAgent = 22;
  var $fbUserAgent = message.fbUserAgent;
  if ($fbUserAgent !== undefined) {
    buffer.writeVarint32(178);
    buffer.writeVarint32($fbUserAgent.length), buffer.append($fbUserAgent);
  }

  // optional bool oc = 23;
  var $oc = message.oc;
  if ($oc !== undefined) {
    buffer.writeVarint32(184);
    buffer.writeByte($oc ? 1 : 0);
  }

  // optional int32 lc = 24;
  var $lc = message.lc;
  if ($lc !== undefined) {
    buffer.writeVarint32(192);
    buffer.writeVarint64($lc | 0);
  }

  // optional IOSAppExtension iosAppExtension = 30;
  var $iosAppExtension = message.iosAppExtension;
  if ($iosAppExtension !== undefined) {
    buffer.writeVarint32(242);
    var nested = proto.encodeIOSAppExtension($iosAppExtension);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 fbAppId = 31;
  var $fbAppId = message.fbAppId;
  if ($fbAppId !== undefined) {
    buffer.writeVarint32(248);
    buffer.writeVarint64($coerceLong($fbAppId));
  }

  // optional bytes fbDeviceId = 32;
  var $fbDeviceId = message.fbDeviceId;
  if ($fbDeviceId !== undefined) {
    buffer.writeVarint32(258);
    buffer.writeVarint32($fbDeviceId.length), buffer.append($fbDeviceId);
  }

  // optional bool pull = 33;
  var $pull = message.pull;
  if ($pull !== undefined) {
    buffer.writeVarint32(264);
    buffer.writeByte($pull ? 1 : 0);
  }

  // optional bytes paddingBytes = 34;
  var $paddingBytes = message.paddingBytes;
  if ($paddingBytes !== undefined) {
    buffer.writeVarint32(274);
    buffer.writeVarint32($paddingBytes.length), buffer.append($paddingBytes);
  }

  // optional int32 yearClass = 36;
  var $yearClass = message.yearClass;
  if ($yearClass !== undefined) {
    buffer.writeVarint32(288);
    buffer.writeVarint64($yearClass | 0);
  }

  // optional int32 memClass = 37;
  var $memClass = message.memClass;
  if ($memClass !== undefined) {
    buffer.writeVarint32(296);
    buffer.writeVarint64($memClass | 0);
  }

  // optional InteropData interopData = 38;
  var $interopData = message.interopData;
  if ($interopData !== undefined) {
    buffer.writeVarint32(306);
    var nested = proto.encodeInteropData($interopData);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeClientPayload = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint64 username = 1;
    case 1: {
      message.username = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional bool passive = 3;
    case 3: {
      message.passive = !!buffer.readByte();
      break;
    }

    // optional UserAgent userAgent = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.userAgent = proto.decodeUserAgent(buffer);
      buffer.limit = limit;
      break;
    }

    // optional WebInfo webInfo = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.webInfo = proto.decodeWebInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string pushName = 7;
    case 7: {
      message.pushName = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional sfixed32 sessionId = 9;
    case 9: {
      message.sessionId = buffer.readInt32();
      break;
    }

    // optional bool shortConnect = 10;
    case 10: {
      message.shortConnect = !!buffer.readByte();
      break;
    }

    // optional ConnectType connectType = 12;
    case 12: {
      var limit = $pushTemporaryLength(buffer);
      message.connectType = proto.decodeConnectType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ConnectReason connectReason = 13;
    case 13: {
      var limit = $pushTemporaryLength(buffer);
      message.connectReason = proto.decodeConnectReason(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated int32 shards = 14;
    case 14: {
      var values = message.shards || (message.shards = []);
      if ((tag & 7) === 2) {
        var outerLimit = $pushTemporaryLength(buffer);
        while (buffer.remaining() > 0) {
          values.push(buffer.readVarint32());
        }
        buffer.limit = outerLimit;
      } else {
        values.push(buffer.readVarint32());
      }
      break;
    }

    // optional DNSSource dnsSource = 15;
    case 15: {
      var limit = $pushTemporaryLength(buffer);
      message.dnsSource = proto.decodeDNSSource(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint32 connectAttemptCount = 16;
    case 16: {
      message.connectAttemptCount = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 device = 18;
    case 18: {
      message.device = buffer.readVarint32() >>> 0;
      break;
    }

    // optional DevicePairingRegistrationData devicePairingData = 19;
    case 19: {
      var limit = $pushTemporaryLength(buffer);
      message.devicePairingData = proto.decodeDevicePairingRegistrationData(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Product product = 20;
    case 20: {
      var limit = $pushTemporaryLength(buffer);
      message.product = proto.decodeProduct(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bytes fbCat = 21;
    case 21: {
      message.fbCat = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes fbUserAgent = 22;
    case 22: {
      message.fbUserAgent = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bool oc = 23;
    case 23: {
      message.oc = !!buffer.readByte();
      break;
    }

    // optional int32 lc = 24;
    case 24: {
      message.lc = buffer.readVarint32();
      break;
    }

    // optional IOSAppExtension iosAppExtension = 30;
    case 30: {
      var limit = $pushTemporaryLength(buffer);
      message.iosAppExtension = proto.decodeIOSAppExtension(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 fbAppId = 31;
    case 31: {
      message.fbAppId = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional bytes fbDeviceId = 32;
    case 32: {
      message.fbDeviceId = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bool pull = 33;
    case 33: {
      message.pull = !!buffer.readByte();
      break;
    }

    // optional bytes paddingBytes = 34;
    case 34: {
      message.paddingBytes = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional int32 yearClass = 36;
    case 36: {
      message.yearClass = buffer.readVarint32();
      break;
    }

    // optional int32 memClass = 37;
    case 37: {
      message.memClass = buffer.readVarint32();
      break;
    }

    // optional InteropData interopData = 38;
    case 38: {
      var limit = $pushTemporaryLength(buffer);
      message.interopData = proto.decodeInteropData(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeCommentMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional MessageKey commentParentKey = 1;
  var $commentParentKey = message.commentParentKey;
  if ($commentParentKey !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeMessageKey($commentParentKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint32 replyCount = 2;
  var $replyCount = message.replyCount;
  if ($replyCount !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32($replyCount);
  }

  return buffer.flip().toBuffer();
};

proto.decodeCommentMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional MessageKey commentParentKey = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.commentParentKey = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint32 replyCount = 2;
    case 2: {
      message.replyCount = buffer.readVarint32() >>> 0;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeContextInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string stanzaId = 1;
  var $stanzaId = message.stanzaId;
  if ($stanzaId !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($stanzaId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string participant = 2;
  var $participant = message.participant;
  if ($participant !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($participant), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional Message quotedMessage = 3;
  var $quotedMessage = message.quotedMessage;
  if ($quotedMessage !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeMessage($quotedMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string remoteJid = 4;
  var $remoteJid = message.remoteJid;
  if ($remoteJid !== undefined) {
    buffer.writeVarint32(34);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($remoteJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // repeated string mentionedJid = 15;
  var array$mentionedJid = message.mentionedJid;
  if (array$mentionedJid !== undefined) {
    for (var i = 0; i < array$mentionedJid.length; i++) {
      var $mentionedJid = array$mentionedJid[i];
      var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
      buffer.writeVarint32(122);
      nested.writeUTF8String($mentionedJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
    }
  }

  // optional string conversionSource = 18;
  var $conversionSource = message.conversionSource;
  if ($conversionSource !== undefined) {
    buffer.writeVarint32(146);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($conversionSource), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes conversionData = 19;
  var $conversionData = message.conversionData;
  if ($conversionData !== undefined) {
    buffer.writeVarint32(154);
    buffer.writeVarint32($conversionData.length), buffer.append($conversionData);
  }

  // optional uint32 conversionDelaySeconds = 20;
  var $conversionDelaySeconds = message.conversionDelaySeconds;
  if ($conversionDelaySeconds !== undefined) {
    buffer.writeVarint32(160);
    buffer.writeVarint32($conversionDelaySeconds);
  }

  // optional uint32 forwardingScore = 21;
  var $forwardingScore = message.forwardingScore;
  if ($forwardingScore !== undefined) {
    buffer.writeVarint32(168);
    buffer.writeVarint32($forwardingScore);
  }

  // optional bool isForwarded = 22;
  var $isForwarded = message.isForwarded;
  if ($isForwarded !== undefined) {
    buffer.writeVarint32(176);
    buffer.writeByte($isForwarded ? 1 : 0);
  }

  // optional AdReplyInfo quotedAd = 23;
  var $quotedAd = message.quotedAd;
  if ($quotedAd !== undefined) {
    buffer.writeVarint32(186);
    var nested = proto.encodeAdReplyInfo($quotedAd);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MessageKey placeholderKey = 24;
  var $placeholderKey = message.placeholderKey;
  if ($placeholderKey !== undefined) {
    buffer.writeVarint32(194);
    var nested = proto.encodeMessageKey($placeholderKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint32 expiration = 25;
  var $expiration = message.expiration;
  if ($expiration !== undefined) {
    buffer.writeVarint32(200);
    buffer.writeVarint32($expiration);
  }

  // optional int64 ephemeralSettingTimestamp = 26;
  var $ephemeralSettingTimestamp = message.ephemeralSettingTimestamp;
  if ($ephemeralSettingTimestamp !== undefined) {
    buffer.writeVarint32(208);
    buffer.writeVarint64($coerceLong($ephemeralSettingTimestamp));
  }

  // optional bytes ephemeralSharedSecret = 27;
  var $ephemeralSharedSecret = message.ephemeralSharedSecret;
  if ($ephemeralSharedSecret !== undefined) {
    buffer.writeVarint32(218);
    buffer.writeVarint32($ephemeralSharedSecret.length), buffer.append($ephemeralSharedSecret);
  }

  // optional ExternalAdReplyInfo externalAdReply = 28;
  var $externalAdReply = message.externalAdReply;
  if ($externalAdReply !== undefined) {
    buffer.writeVarint32(226);
    var nested = proto.encodeExternalAdReplyInfo($externalAdReply);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string entryPointConversionSource = 29;
  var $entryPointConversionSource = message.entryPointConversionSource;
  if ($entryPointConversionSource !== undefined) {
    buffer.writeVarint32(234);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($entryPointConversionSource), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string entryPointConversionApp = 30;
  var $entryPointConversionApp = message.entryPointConversionApp;
  if ($entryPointConversionApp !== undefined) {
    buffer.writeVarint32(242);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($entryPointConversionApp), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint32 entryPointConversionDelaySeconds = 31;
  var $entryPointConversionDelaySeconds = message.entryPointConversionDelaySeconds;
  if ($entryPointConversionDelaySeconds !== undefined) {
    buffer.writeVarint32(248);
    buffer.writeVarint32($entryPointConversionDelaySeconds);
  }

  // optional DisappearingMode disappearingMode = 32;
  var $disappearingMode = message.disappearingMode;
  if ($disappearingMode !== undefined) {
    buffer.writeVarint32(258);
    var nested = proto.encodeDisappearingMode($disappearingMode);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ActionLink actionLink = 33;
  var $actionLink = message.actionLink;
  if ($actionLink !== undefined) {
    buffer.writeVarint32(266);
    var nested = proto.encodeActionLink($actionLink);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string groupSubject = 34;
  var $groupSubject = message.groupSubject;
  if ($groupSubject !== undefined) {
    buffer.writeVarint32(274);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($groupSubject), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string parentGroupJid = 35;
  var $parentGroupJid = message.parentGroupJid;
  if ($parentGroupJid !== undefined) {
    buffer.writeVarint32(282);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($parentGroupJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string trustBannerType = 37;
  var $trustBannerType = message.trustBannerType;
  if ($trustBannerType !== undefined) {
    buffer.writeVarint32(298);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($trustBannerType), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint32 trustBannerAction = 38;
  var $trustBannerAction = message.trustBannerAction;
  if ($trustBannerAction !== undefined) {
    buffer.writeVarint32(304);
    buffer.writeVarint32($trustBannerAction);
  }

  // optional bool isSampled = 39;
  var $isSampled = message.isSampled;
  if ($isSampled !== undefined) {
    buffer.writeVarint32(312);
    buffer.writeByte($isSampled ? 1 : 0);
  }

  // repeated GroupMention groupMentions = 40;
  var array$groupMentions = message.groupMentions;
  if (array$groupMentions !== undefined) {
    for (var i = 0; i < array$groupMentions.length; i++) {
      var $groupMentions = array$groupMentions[i];
      var nested = proto.encodeGroupMention($groupMentions);
      buffer.writeVarint32(322);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional UTMInfo utm = 41;
  var $utm = message.utm;
  if ($utm !== undefined) {
    buffer.writeVarint32(330);
    var nested = proto.encodeUTMInfo($utm);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ForwardedNewsletterMessageInfo forwardedNewsletterMessageInfo = 43;
  var $forwardedNewsletterMessageInfo = message.forwardedNewsletterMessageInfo;
  if ($forwardedNewsletterMessageInfo !== undefined) {
    buffer.writeVarint32(346);
    var nested = proto.encodeForwardedNewsletterMessageInfo($forwardedNewsletterMessageInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional BusinessMessageForwardInfo businessMessageForwardInfo = 44;
  var $businessMessageForwardInfo = message.businessMessageForwardInfo;
  if ($businessMessageForwardInfo !== undefined) {
    buffer.writeVarint32(354);
    var nested = proto.encodeBusinessMessageForwardInfo($businessMessageForwardInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string smbClientCampaignId = 45;
  var $smbClientCampaignId = message.smbClientCampaignId;
  if ($smbClientCampaignId !== undefined) {
    buffer.writeVarint32(362);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($smbClientCampaignId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string smbServerCampaignId = 46;
  var $smbServerCampaignId = message.smbServerCampaignId;
  if ($smbServerCampaignId !== undefined) {
    buffer.writeVarint32(370);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($smbServerCampaignId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional DataSharingContext dataSharingContext = 47;
  var $dataSharingContext = message.dataSharingContext;
  if ($dataSharingContext !== undefined) {
    buffer.writeVarint32(378);
    var nested = proto.encodeDataSharingContext($dataSharingContext);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool alwaysShowAdAttribution = 48;
  var $alwaysShowAdAttribution = message.alwaysShowAdAttribution;
  if ($alwaysShowAdAttribution !== undefined) {
    buffer.writeVarint32(384);
    buffer.writeByte($alwaysShowAdAttribution ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeContextInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string stanzaId = 1;
    case 1: {
      message.stanzaId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string participant = 2;
    case 2: {
      message.participant = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional Message quotedMessage = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.quotedMessage = proto.decodeMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string remoteJid = 4;
    case 4: {
      message.remoteJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // repeated string mentionedJid = 15;
    case 15: {
      var values = message.mentionedJid || (message.mentionedJid = []);
      values.push(buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES));
      break;
    }

    // optional string conversionSource = 18;
    case 18: {
      message.conversionSource = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes conversionData = 19;
    case 19: {
      message.conversionData = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint32 conversionDelaySeconds = 20;
    case 20: {
      message.conversionDelaySeconds = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 forwardingScore = 21;
    case 21: {
      message.forwardingScore = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bool isForwarded = 22;
    case 22: {
      message.isForwarded = !!buffer.readByte();
      break;
    }

    // optional AdReplyInfo quotedAd = 23;
    case 23: {
      var limit = $pushTemporaryLength(buffer);
      message.quotedAd = proto.decodeAdReplyInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MessageKey placeholderKey = 24;
    case 24: {
      var limit = $pushTemporaryLength(buffer);
      message.placeholderKey = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint32 expiration = 25;
    case 25: {
      message.expiration = buffer.readVarint32() >>> 0;
      break;
    }

    // optional int64 ephemeralSettingTimestamp = 26;
    case 26: {
      message.ephemeralSettingTimestamp = buffer.readVarint64();
      break;
    }

    // optional bytes ephemeralSharedSecret = 27;
    case 27: {
      message.ephemeralSharedSecret = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional ExternalAdReplyInfo externalAdReply = 28;
    case 28: {
      var limit = $pushTemporaryLength(buffer);
      message.externalAdReply = proto.decodeExternalAdReplyInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string entryPointConversionSource = 29;
    case 29: {
      message.entryPointConversionSource = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string entryPointConversionApp = 30;
    case 30: {
      message.entryPointConversionApp = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint32 entryPointConversionDelaySeconds = 31;
    case 31: {
      message.entryPointConversionDelaySeconds = buffer.readVarint32() >>> 0;
      break;
    }

    // optional DisappearingMode disappearingMode = 32;
    case 32: {
      var limit = $pushTemporaryLength(buffer);
      message.disappearingMode = proto.decodeDisappearingMode(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ActionLink actionLink = 33;
    case 33: {
      var limit = $pushTemporaryLength(buffer);
      message.actionLink = proto.decodeActionLink(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string groupSubject = 34;
    case 34: {
      message.groupSubject = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string parentGroupJid = 35;
    case 35: {
      message.parentGroupJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string trustBannerType = 37;
    case 37: {
      message.trustBannerType = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint32 trustBannerAction = 38;
    case 38: {
      message.trustBannerAction = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bool isSampled = 39;
    case 39: {
      message.isSampled = !!buffer.readByte();
      break;
    }

    // repeated GroupMention groupMentions = 40;
    case 40: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.groupMentions || (message.groupMentions = []);
      values.push(proto.decodeGroupMention(buffer));
      buffer.limit = limit;
      break;
    }

    // optional UTMInfo utm = 41;
    case 41: {
      var limit = $pushTemporaryLength(buffer);
      message.utm = proto.decodeUTMInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ForwardedNewsletterMessageInfo forwardedNewsletterMessageInfo = 43;
    case 43: {
      var limit = $pushTemporaryLength(buffer);
      message.forwardedNewsletterMessageInfo = proto.decodeForwardedNewsletterMessageInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional BusinessMessageForwardInfo businessMessageForwardInfo = 44;
    case 44: {
      var limit = $pushTemporaryLength(buffer);
      message.businessMessageForwardInfo = proto.decodeBusinessMessageForwardInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string smbClientCampaignId = 45;
    case 45: {
      message.smbClientCampaignId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string smbServerCampaignId = 46;
    case 46: {
      message.smbServerCampaignId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional DataSharingContext dataSharingContext = 47;
    case 47: {
      var limit = $pushTemporaryLength(buffer);
      message.dataSharingContext = proto.decodeDataSharingContext(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool alwaysShowAdAttribution = 48;
    case 48: {
      message.alwaysShowAdAttribution = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeConversation = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // required string id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($id), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // repeated HistorySyncMsg messages = 2;
  var array$messages = message.messages;
  if (array$messages !== undefined) {
    for (var i = 0; i < array$messages.length; i++) {
      var $messages = array$messages[i];
      var nested = proto.encodeHistorySyncMsg($messages);
      buffer.writeVarint32(18);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional string newJid = 3;
  var $newJid = message.newJid;
  if ($newJid !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($newJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string oldJid = 4;
  var $oldJid = message.oldJid;
  if ($oldJid !== undefined) {
    buffer.writeVarint32(34);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($oldJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint64 lastMsgTimestamp = 5;
  var $lastMsgTimestamp = message.lastMsgTimestamp;
  if ($lastMsgTimestamp !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint64($coerceLong($lastMsgTimestamp));
  }

  // optional uint32 unreadCount = 6;
  var $unreadCount = message.unreadCount;
  if ($unreadCount !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeVarint32($unreadCount);
  }

  // optional bool readOnly = 7;
  var $readOnly = message.readOnly;
  if ($readOnly !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeByte($readOnly ? 1 : 0);
  }

  // optional bool endOfHistoryTransfer = 8;
  var $endOfHistoryTransfer = message.endOfHistoryTransfer;
  if ($endOfHistoryTransfer !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeByte($endOfHistoryTransfer ? 1 : 0);
  }

  // optional uint32 ephemeralExpiration = 9;
  var $ephemeralExpiration = message.ephemeralExpiration;
  if ($ephemeralExpiration !== undefined) {
    buffer.writeVarint32(72);
    buffer.writeVarint32($ephemeralExpiration);
  }

  // optional int64 ephemeralSettingTimestamp = 10;
  var $ephemeralSettingTimestamp = message.ephemeralSettingTimestamp;
  if ($ephemeralSettingTimestamp !== undefined) {
    buffer.writeVarint32(80);
    buffer.writeVarint64($coerceLong($ephemeralSettingTimestamp));
  }

  // optional EndOfHistoryTransferType endOfHistoryTransferType = 11;
  var $endOfHistoryTransferType = message.endOfHistoryTransferType;
  if ($endOfHistoryTransferType !== undefined) {
    buffer.writeVarint32(90);
    var nested = proto.encodeEndOfHistoryTransferType($endOfHistoryTransferType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 conversationTimestamp = 12;
  var $conversationTimestamp = message.conversationTimestamp;
  if ($conversationTimestamp !== undefined) {
    buffer.writeVarint32(96);
    buffer.writeVarint64($coerceLong($conversationTimestamp));
  }

  // optional string name = 13;
  var $name = message.name;
  if ($name !== undefined) {
    buffer.writeVarint32(106);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($name), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string pHash = 14;
  var $pHash = message.pHash;
  if ($pHash !== undefined) {
    buffer.writeVarint32(114);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pHash), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool notSpam = 15;
  var $notSpam = message.notSpam;
  if ($notSpam !== undefined) {
    buffer.writeVarint32(120);
    buffer.writeByte($notSpam ? 1 : 0);
  }

  // optional bool archived = 16;
  var $archived = message.archived;
  if ($archived !== undefined) {
    buffer.writeVarint32(128);
    buffer.writeByte($archived ? 1 : 0);
  }

  // optional DisappearingMode disappearingMode = 17;
  var $disappearingMode = message.disappearingMode;
  if ($disappearingMode !== undefined) {
    buffer.writeVarint32(138);
    var nested = proto.encodeDisappearingMode($disappearingMode);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint32 unreadMentionCount = 18;
  var $unreadMentionCount = message.unreadMentionCount;
  if ($unreadMentionCount !== undefined) {
    buffer.writeVarint32(144);
    buffer.writeVarint32($unreadMentionCount);
  }

  // optional bool markedAsUnread = 19;
  var $markedAsUnread = message.markedAsUnread;
  if ($markedAsUnread !== undefined) {
    buffer.writeVarint32(152);
    buffer.writeByte($markedAsUnread ? 1 : 0);
  }

  // repeated GroupParticipant participant = 20;
  var array$participant = message.participant;
  if (array$participant !== undefined) {
    for (var i = 0; i < array$participant.length; i++) {
      var $participant = array$participant[i];
      var nested = proto.encodeGroupParticipant($participant);
      buffer.writeVarint32(162);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional bytes tcToken = 21;
  var $tcToken = message.tcToken;
  if ($tcToken !== undefined) {
    buffer.writeVarint32(170);
    buffer.writeVarint32($tcToken.length), buffer.append($tcToken);
  }

  // optional uint64 tcTokenTimestamp = 22;
  var $tcTokenTimestamp = message.tcTokenTimestamp;
  if ($tcTokenTimestamp !== undefined) {
    buffer.writeVarint32(176);
    buffer.writeVarint64($coerceLong($tcTokenTimestamp));
  }

  // optional bytes contactPrimaryIdentityKey = 23;
  var $contactPrimaryIdentityKey = message.contactPrimaryIdentityKey;
  if ($contactPrimaryIdentityKey !== undefined) {
    buffer.writeVarint32(186);
    buffer.writeVarint32($contactPrimaryIdentityKey.length), buffer.append($contactPrimaryIdentityKey);
  }

  // optional uint32 pinned = 24;
  var $pinned = message.pinned;
  if ($pinned !== undefined) {
    buffer.writeVarint32(192);
    buffer.writeVarint32($pinned);
  }

  // optional uint64 muteEndTime = 25;
  var $muteEndTime = message.muteEndTime;
  if ($muteEndTime !== undefined) {
    buffer.writeVarint32(200);
    buffer.writeVarint64($coerceLong($muteEndTime));
  }

  // optional WallpaperSettings wallpaper = 26;
  var $wallpaper = message.wallpaper;
  if ($wallpaper !== undefined) {
    buffer.writeVarint32(210);
    var nested = proto.encodeWallpaperSettings($wallpaper);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MediaVisibility mediaVisibility = 27;
  var $mediaVisibility = message.mediaVisibility;
  if ($mediaVisibility !== undefined) {
    buffer.writeVarint32(216);
    buffer.writeVarint32(proto.encodeMediaVisibility[$mediaVisibility]);
  }

  // optional uint64 tcTokenSenderTimestamp = 28;
  var $tcTokenSenderTimestamp = message.tcTokenSenderTimestamp;
  if ($tcTokenSenderTimestamp !== undefined) {
    buffer.writeVarint32(224);
    buffer.writeVarint64($coerceLong($tcTokenSenderTimestamp));
  }

  // optional bool suspended = 29;
  var $suspended = message.suspended;
  if ($suspended !== undefined) {
    buffer.writeVarint32(232);
    buffer.writeByte($suspended ? 1 : 0);
  }

  // optional bool terminated = 30;
  var $terminated = message.terminated;
  if ($terminated !== undefined) {
    buffer.writeVarint32(240);
    buffer.writeByte($terminated ? 1 : 0);
  }

  // optional uint64 createdAt = 31;
  var $createdAt = message.createdAt;
  if ($createdAt !== undefined) {
    buffer.writeVarint32(248);
    buffer.writeVarint64($coerceLong($createdAt));
  }

  // optional string createdBy = 32;
  var $createdBy = message.createdBy;
  if ($createdBy !== undefined) {
    buffer.writeVarint32(258);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($createdBy), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string description = 33;
  var $description = message.description;
  if ($description !== undefined) {
    buffer.writeVarint32(266);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($description), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool support = 34;
  var $support = message.support;
  if ($support !== undefined) {
    buffer.writeVarint32(272);
    buffer.writeByte($support ? 1 : 0);
  }

  // optional bool isParentGroup = 35;
  var $isParentGroup = message.isParentGroup;
  if ($isParentGroup !== undefined) {
    buffer.writeVarint32(280);
    buffer.writeByte($isParentGroup ? 1 : 0);
  }

  // optional string parentGroupId = 37;
  var $parentGroupId = message.parentGroupId;
  if ($parentGroupId !== undefined) {
    buffer.writeVarint32(298);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($parentGroupId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool isDefaultSubgroup = 36;
  var $isDefaultSubgroup = message.isDefaultSubgroup;
  if ($isDefaultSubgroup !== undefined) {
    buffer.writeVarint32(288);
    buffer.writeByte($isDefaultSubgroup ? 1 : 0);
  }

  // optional string displayName = 38;
  var $displayName = message.displayName;
  if ($displayName !== undefined) {
    buffer.writeVarint32(306);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($displayName), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string pnJid = 39;
  var $pnJid = message.pnJid;
  if ($pnJid !== undefined) {
    buffer.writeVarint32(314);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pnJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool shareOwnPn = 40;
  var $shareOwnPn = message.shareOwnPn;
  if ($shareOwnPn !== undefined) {
    buffer.writeVarint32(320);
    buffer.writeByte($shareOwnPn ? 1 : 0);
  }

  // optional bool pnhDuplicateLidThread = 41;
  var $pnhDuplicateLidThread = message.pnhDuplicateLidThread;
  if ($pnhDuplicateLidThread !== undefined) {
    buffer.writeVarint32(328);
    buffer.writeByte($pnhDuplicateLidThread ? 1 : 0);
  }

  // optional string lidJid = 42;
  var $lidJid = message.lidJid;
  if ($lidJid !== undefined) {
    buffer.writeVarint32(338);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($lidJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string username = 43;
  var $username = message.username;
  if ($username !== undefined) {
    buffer.writeVarint32(346);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($username), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string lidOriginType = 44;
  var $lidOriginType = message.lidOriginType;
  if ($lidOriginType !== undefined) {
    buffer.writeVarint32(354);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($lidOriginType), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint32 commentsCount = 45;
  var $commentsCount = message.commentsCount;
  if ($commentsCount !== undefined) {
    buffer.writeVarint32(360);
    buffer.writeVarint32($commentsCount);
  }

  // optional bool locked = 46;
  var $locked = message.locked;
  if ($locked !== undefined) {
    buffer.writeVarint32(368);
    buffer.writeByte($locked ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeConversation = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // required string id = 1;
    case 1: {
      message.id = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // repeated HistorySyncMsg messages = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.messages || (message.messages = []);
      values.push(proto.decodeHistorySyncMsg(buffer));
      buffer.limit = limit;
      break;
    }

    // optional string newJid = 3;
    case 3: {
      message.newJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string oldJid = 4;
    case 4: {
      message.oldJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint64 lastMsgTimestamp = 5;
    case 5: {
      message.lastMsgTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint32 unreadCount = 6;
    case 6: {
      message.unreadCount = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bool readOnly = 7;
    case 7: {
      message.readOnly = !!buffer.readByte();
      break;
    }

    // optional bool endOfHistoryTransfer = 8;
    case 8: {
      message.endOfHistoryTransfer = !!buffer.readByte();
      break;
    }

    // optional uint32 ephemeralExpiration = 9;
    case 9: {
      message.ephemeralExpiration = buffer.readVarint32() >>> 0;
      break;
    }

    // optional int64 ephemeralSettingTimestamp = 10;
    case 10: {
      message.ephemeralSettingTimestamp = buffer.readVarint64();
      break;
    }

    // optional EndOfHistoryTransferType endOfHistoryTransferType = 11;
    case 11: {
      var limit = $pushTemporaryLength(buffer);
      message.endOfHistoryTransferType = proto.decodeEndOfHistoryTransferType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 conversationTimestamp = 12;
    case 12: {
      message.conversationTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional string name = 13;
    case 13: {
      message.name = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string pHash = 14;
    case 14: {
      message.pHash = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool notSpam = 15;
    case 15: {
      message.notSpam = !!buffer.readByte();
      break;
    }

    // optional bool archived = 16;
    case 16: {
      message.archived = !!buffer.readByte();
      break;
    }

    // optional DisappearingMode disappearingMode = 17;
    case 17: {
      var limit = $pushTemporaryLength(buffer);
      message.disappearingMode = proto.decodeDisappearingMode(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint32 unreadMentionCount = 18;
    case 18: {
      message.unreadMentionCount = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bool markedAsUnread = 19;
    case 19: {
      message.markedAsUnread = !!buffer.readByte();
      break;
    }

    // repeated GroupParticipant participant = 20;
    case 20: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.participant || (message.participant = []);
      values.push(proto.decodeGroupParticipant(buffer));
      buffer.limit = limit;
      break;
    }

    // optional bytes tcToken = 21;
    case 21: {
      message.tcToken = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint64 tcTokenTimestamp = 22;
    case 22: {
      message.tcTokenTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional bytes contactPrimaryIdentityKey = 23;
    case 23: {
      message.contactPrimaryIdentityKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint32 pinned = 24;
    case 24: {
      message.pinned = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint64 muteEndTime = 25;
    case 25: {
      message.muteEndTime = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional WallpaperSettings wallpaper = 26;
    case 26: {
      var limit = $pushTemporaryLength(buffer);
      message.wallpaper = proto.decodeWallpaperSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MediaVisibility mediaVisibility = 27;
    case 27: {
      message.mediaVisibility = proto.decodeMediaVisibility[buffer.readVarint32()];
      break;
    }

    // optional uint64 tcTokenSenderTimestamp = 28;
    case 28: {
      message.tcTokenSenderTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional bool suspended = 29;
    case 29: {
      message.suspended = !!buffer.readByte();
      break;
    }

    // optional bool terminated = 30;
    case 30: {
      message.terminated = !!buffer.readByte();
      break;
    }

    // optional uint64 createdAt = 31;
    case 31: {
      message.createdAt = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional string createdBy = 32;
    case 32: {
      message.createdBy = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string description = 33;
    case 33: {
      message.description = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool support = 34;
    case 34: {
      message.support = !!buffer.readByte();
      break;
    }

    // optional bool isParentGroup = 35;
    case 35: {
      message.isParentGroup = !!buffer.readByte();
      break;
    }

    // optional string parentGroupId = 37;
    case 37: {
      message.parentGroupId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool isDefaultSubgroup = 36;
    case 36: {
      message.isDefaultSubgroup = !!buffer.readByte();
      break;
    }

    // optional string displayName = 38;
    case 38: {
      message.displayName = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string pnJid = 39;
    case 39: {
      message.pnJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool shareOwnPn = 40;
    case 40: {
      message.shareOwnPn = !!buffer.readByte();
      break;
    }

    // optional bool pnhDuplicateLidThread = 41;
    case 41: {
      message.pnhDuplicateLidThread = !!buffer.readByte();
      break;
    }

    // optional string lidJid = 42;
    case 42: {
      message.lidJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string username = 43;
    case 43: {
      message.username = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string lidOriginType = 44;
    case 44: {
      message.lidOriginType = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint32 commentsCount = 45;
    case 45: {
      message.commentsCount = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bool locked = 46;
    case 46: {
      message.locked = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  if (message.id === undefined)
    throw new Error("Missing required field: id");

  return message;
};

proto.encodeDeviceCapabilities = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional ChatLockSupportLevel chatLockSupportLevel = 1;
  var $chatLockSupportLevel = message.chatLockSupportLevel;
  if ($chatLockSupportLevel !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeChatLockSupportLevel($chatLockSupportLevel);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeDeviceCapabilities = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional ChatLockSupportLevel chatLockSupportLevel = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.chatLockSupportLevel = proto.decodeChatLockSupportLevel(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeDeviceConsistencyCodeMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 generation = 1;
  var $generation = message.generation;
  if ($generation !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($generation);
  }

  // optional bytes signature = 2;
  var $signature = message.signature;
  if ($signature !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($signature.length), buffer.append($signature);
  }

  return buffer.flip().toBuffer();
};

proto.decodeDeviceConsistencyCodeMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 generation = 1;
    case 1: {
      message.generation = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes signature = 2;
    case 2: {
      message.signature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeDeviceListMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes senderKeyHash = 1;
  var $senderKeyHash = message.senderKeyHash;
  if ($senderKeyHash !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($senderKeyHash.length), buffer.append($senderKeyHash);
  }

  // optional uint64 senderTimestamp = 2;
  var $senderTimestamp = message.senderTimestamp;
  if ($senderTimestamp !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($senderTimestamp));
  }

  // repeated uint32 senderKeyIndexes = 3;
  var array$senderKeyIndexes = message.senderKeyIndexes;
  if (array$senderKeyIndexes !== undefined) {
    var packed = new ByteBuffer(undefined, /* isLittleEndian */ true);
    for (var i = 0; i < array$senderKeyIndexes.length; i++) {
      var $senderKeyIndexes = array$senderKeyIndexes[i];
      packed.writeVarint32($senderKeyIndexes);
    }
    buffer.writeVarint32(26);
    buffer.writeVarint32(packed.flip().limit);
    buffer.append(packed);
  }

  // optional ADVEncryptionType senderAccountType = 4;
  var $senderAccountType = message.senderAccountType;
  if ($senderAccountType !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint32(proto.encodeADVEncryptionType[$senderAccountType]);
  }

  // optional ADVEncryptionType receiverAccountType = 5;
  var $receiverAccountType = message.receiverAccountType;
  if ($receiverAccountType !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32(proto.encodeADVEncryptionType[$receiverAccountType]);
  }

  // optional bytes recipientKeyHash = 8;
  var $recipientKeyHash = message.recipientKeyHash;
  if ($recipientKeyHash !== undefined) {
    buffer.writeVarint32(66);
    buffer.writeVarint32($recipientKeyHash.length), buffer.append($recipientKeyHash);
  }

  // optional uint64 recipientTimestamp = 9;
  var $recipientTimestamp = message.recipientTimestamp;
  if ($recipientTimestamp !== undefined) {
    buffer.writeVarint32(72);
    buffer.writeVarint64($coerceLong($recipientTimestamp));
  }

  // repeated uint32 recipientKeyIndexes = 10;
  var array$recipientKeyIndexes = message.recipientKeyIndexes;
  if (array$recipientKeyIndexes !== undefined) {
    var packed = new ByteBuffer(undefined, /* isLittleEndian */ true);
    for (var i = 0; i < array$recipientKeyIndexes.length; i++) {
      var $recipientKeyIndexes = array$recipientKeyIndexes[i];
      packed.writeVarint32($recipientKeyIndexes);
    }
    buffer.writeVarint32(82);
    buffer.writeVarint32(packed.flip().limit);
    buffer.append(packed);
  }

  return buffer.flip().toBuffer();
};

proto.decodeDeviceListMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes senderKeyHash = 1;
    case 1: {
      message.senderKeyHash = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint64 senderTimestamp = 2;
    case 2: {
      message.senderTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // repeated uint32 senderKeyIndexes = 3;
    case 3: {
      var values = message.senderKeyIndexes || (message.senderKeyIndexes = []);
      if ((tag & 7) === 2) {
        var outerLimit = $pushTemporaryLength(buffer);
        while (buffer.remaining() > 0) {
          values.push(buffer.readVarint32() >>> 0);
        }
        buffer.limit = outerLimit;
      } else {
        values.push(buffer.readVarint32() >>> 0);
      }
      break;
    }

    // optional ADVEncryptionType senderAccountType = 4;
    case 4: {
      message.senderAccountType = proto.decodeADVEncryptionType[buffer.readVarint32()];
      break;
    }

    // optional ADVEncryptionType receiverAccountType = 5;
    case 5: {
      message.receiverAccountType = proto.decodeADVEncryptionType[buffer.readVarint32()];
      break;
    }

    // optional bytes recipientKeyHash = 8;
    case 8: {
      message.recipientKeyHash = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint64 recipientTimestamp = 9;
    case 9: {
      message.recipientTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // repeated uint32 recipientKeyIndexes = 10;
    case 10: {
      var values = message.recipientKeyIndexes || (message.recipientKeyIndexes = []);
      if ((tag & 7) === 2) {
        var outerLimit = $pushTemporaryLength(buffer);
        while (buffer.remaining() > 0) {
          values.push(buffer.readVarint32() >>> 0);
        }
        buffer.limit = outerLimit;
      } else {
        values.push(buffer.readVarint32() >>> 0);
      }
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeDeviceProps = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string os = 1;
  var $os = message.os;
  if ($os !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($os), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional AppVersion version = 2;
  var $version = message.version;
  if ($version !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeAppVersion($version);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PlatformType platformType = 3;
  var $platformType = message.platformType;
  if ($platformType !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodePlatformType($platformType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool requireFullSync = 4;
  var $requireFullSync = message.requireFullSync;
  if ($requireFullSync !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeByte($requireFullSync ? 1 : 0);
  }

  // optional HistorySyncConfig historySyncConfig = 5;
  var $historySyncConfig = message.historySyncConfig;
  if ($historySyncConfig !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeHistorySyncConfig($historySyncConfig);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeDeviceProps = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string os = 1;
    case 1: {
      message.os = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional AppVersion version = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.version = proto.decodeAppVersion(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PlatformType platformType = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.platformType = proto.decodePlatformType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool requireFullSync = 4;
    case 4: {
      message.requireFullSync = !!buffer.readByte();
      break;
    }

    // optional HistorySyncConfig historySyncConfig = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.historySyncConfig = proto.decodeHistorySyncConfig(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeDisappearingMode = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional Initiator initiator = 1;
  var $initiator = message.initiator;
  if ($initiator !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeInitiator($initiator);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Trigger trigger = 2;
  var $trigger = message.trigger;
  if ($trigger !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeTrigger($trigger);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string initiatorDeviceJid = 3;
  var $initiatorDeviceJid = message.initiatorDeviceJid;
  if ($initiatorDeviceJid !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($initiatorDeviceJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool initiatedByMe = 4;
  var $initiatedByMe = message.initiatedByMe;
  if ($initiatedByMe !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeByte($initiatedByMe ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeDisappearingMode = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional Initiator initiator = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.initiator = proto.decodeInitiator(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Trigger trigger = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.trigger = proto.decodeTrigger(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string initiatorDeviceJid = 3;
    case 3: {
      message.initiatorDeviceJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool initiatedByMe = 4;
    case 4: {
      message.initiatedByMe = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeEphemeralSetting = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional sfixed32 duration = 1;
  var $duration = message.duration;
  if ($duration !== undefined) {
    buffer.writeVarint32(13);
    buffer.writeInt32($duration);
  }

  // optional sfixed64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    buffer.writeVarint32(17);
    buffer.writeInt64($coerceLong($timestamp));
  }

  return buffer.flip().toBuffer();
};

proto.decodeEphemeralSetting = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional sfixed32 duration = 1;
    case 1: {
      message.duration = buffer.readInt32();
      break;
    }

    // optional sfixed64 timestamp = 2;
    case 2: {
      message.timestamp = buffer.readInt64();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeEventAdditionalMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bool isStale = 1;
  var $isStale = message.isStale;
  if ($isStale !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeByte($isStale ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeEventAdditionalMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bool isStale = 1;
    case 1: {
      message.isStale = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeEventResponse = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional MessageKey eventResponseMessageKey = 1;
  var $eventResponseMessageKey = message.eventResponseMessageKey;
  if ($eventResponseMessageKey !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeMessageKey($eventResponseMessageKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional int64 timestampMs = 2;
  var $timestampMs = message.timestampMs;
  if ($timestampMs !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($timestampMs));
  }

  // optional Message.EventResponseMessage eventResponseMessage = 3;
  var $eventResponseMessage = message.eventResponseMessage;
  if ($eventResponseMessage !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeMessage.EventResponseMessage($eventResponseMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool unread = 4;
  var $unread = message.unread;
  if ($unread !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeByte($unread ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeEventResponse = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional MessageKey eventResponseMessageKey = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.eventResponseMessageKey = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional int64 timestampMs = 2;
    case 2: {
      message.timestampMs = buffer.readVarint64();
      break;
    }

    // optional Message.EventResponseMessage eventResponseMessage = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.eventResponseMessage = proto.decodeMessage.EventResponseMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool unread = 4;
    case 4: {
      message.unread = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeExitCode = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint64 code = 1;
  var $code = message.code;
  if ($code !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint64($coerceLong($code));
  }

  // optional string text = 2;
  var $text = message.text;
  if ($text !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($text), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeExitCode = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint64 code = 1;
    case 1: {
      message.code = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional string text = 2;
    case 2: {
      message.text = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeExternalBlobReference = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes mediaKey = 1;
  var $mediaKey = message.mediaKey;
  if ($mediaKey !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($mediaKey.length), buffer.append($mediaKey);
  }

  // optional string directPath = 2;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($directPath), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string handle = 3;
  var $handle = message.handle;
  if ($handle !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($handle), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint64 fileSizeBytes = 4;
  var $fileSizeBytes = message.fileSizeBytes;
  if ($fileSizeBytes !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint64($coerceLong($fileSizeBytes));
  }

  // optional bytes fileSha256 = 5;
  var $fileSha256 = message.fileSha256;
  if ($fileSha256 !== undefined) {
    buffer.writeVarint32(42);
    buffer.writeVarint32($fileSha256.length), buffer.append($fileSha256);
  }

  // optional bytes fileEncSha256 = 6;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    buffer.writeVarint32(50);
    buffer.writeVarint32($fileEncSha256.length), buffer.append($fileEncSha256);
  }

  return buffer.flip().toBuffer();
};

proto.decodeExternalBlobReference = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes mediaKey = 1;
    case 1: {
      message.mediaKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string directPath = 2;
    case 2: {
      message.directPath = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string handle = 3;
    case 3: {
      message.handle = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint64 fileSizeBytes = 4;
    case 4: {
      message.fileSizeBytes = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional bytes fileSha256 = 5;
    case 5: {
      message.fileSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes fileEncSha256 = 6;
    case 6: {
      message.fileEncSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeGlobalSettings = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional WallpaperSettings lightThemeWallpaper = 1;
  var $lightThemeWallpaper = message.lightThemeWallpaper;
  if ($lightThemeWallpaper !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeWallpaperSettings($lightThemeWallpaper);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MediaVisibility mediaVisibility = 2;
  var $mediaVisibility = message.mediaVisibility;
  if ($mediaVisibility !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32(proto.encodeMediaVisibility[$mediaVisibility]);
  }

  // optional WallpaperSettings darkThemeWallpaper = 3;
  var $darkThemeWallpaper = message.darkThemeWallpaper;
  if ($darkThemeWallpaper !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeWallpaperSettings($darkThemeWallpaper);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional AutoDownloadSettings autoDownloadWiFi = 4;
  var $autoDownloadWiFi = message.autoDownloadWiFi;
  if ($autoDownloadWiFi !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeAutoDownloadSettings($autoDownloadWiFi);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional AutoDownloadSettings autoDownloadCellular = 5;
  var $autoDownloadCellular = message.autoDownloadCellular;
  if ($autoDownloadCellular !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeAutoDownloadSettings($autoDownloadCellular);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional AutoDownloadSettings autoDownloadRoaming = 6;
  var $autoDownloadRoaming = message.autoDownloadRoaming;
  if ($autoDownloadRoaming !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeAutoDownloadSettings($autoDownloadRoaming);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool showIndividualNotificationsPreview = 7;
  var $showIndividualNotificationsPreview = message.showIndividualNotificationsPreview;
  if ($showIndividualNotificationsPreview !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeByte($showIndividualNotificationsPreview ? 1 : 0);
  }

  // optional bool showGroupNotificationsPreview = 8;
  var $showGroupNotificationsPreview = message.showGroupNotificationsPreview;
  if ($showGroupNotificationsPreview !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeByte($showGroupNotificationsPreview ? 1 : 0);
  }

  // optional int32 disappearingModeDuration = 9;
  var $disappearingModeDuration = message.disappearingModeDuration;
  if ($disappearingModeDuration !== undefined) {
    buffer.writeVarint32(72);
    buffer.writeVarint64($disappearingModeDuration | 0);
  }

  // optional int64 disappearingModeTimestamp = 10;
  var $disappearingModeTimestamp = message.disappearingModeTimestamp;
  if ($disappearingModeTimestamp !== undefined) {
    buffer.writeVarint32(80);
    buffer.writeVarint64($coerceLong($disappearingModeTimestamp));
  }

  // optional AvatarUserSettings avatarUserSettings = 11;
  var $avatarUserSettings = message.avatarUserSettings;
  if ($avatarUserSettings !== undefined) {
    buffer.writeVarint32(90);
    var nested = proto.encodeAvatarUserSettings($avatarUserSettings);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional int32 fontSize = 12;
  var $fontSize = message.fontSize;
  if ($fontSize !== undefined) {
    buffer.writeVarint32(96);
    buffer.writeVarint64($fontSize | 0);
  }

  // optional bool securityNotifications = 13;
  var $securityNotifications = message.securityNotifications;
  if ($securityNotifications !== undefined) {
    buffer.writeVarint32(104);
    buffer.writeByte($securityNotifications ? 1 : 0);
  }

  // optional bool autoUnarchiveChats = 14;
  var $autoUnarchiveChats = message.autoUnarchiveChats;
  if ($autoUnarchiveChats !== undefined) {
    buffer.writeVarint32(112);
    buffer.writeByte($autoUnarchiveChats ? 1 : 0);
  }

  // optional int32 videoQualityMode = 15;
  var $videoQualityMode = message.videoQualityMode;
  if ($videoQualityMode !== undefined) {
    buffer.writeVarint32(120);
    buffer.writeVarint64($videoQualityMode | 0);
  }

  // optional int32 photoQualityMode = 16;
  var $photoQualityMode = message.photoQualityMode;
  if ($photoQualityMode !== undefined) {
    buffer.writeVarint32(128);
    buffer.writeVarint64($photoQualityMode | 0);
  }

  // optional NotificationSettings individualNotificationSettings = 17;
  var $individualNotificationSettings = message.individualNotificationSettings;
  if ($individualNotificationSettings !== undefined) {
    buffer.writeVarint32(138);
    var nested = proto.encodeNotificationSettings($individualNotificationSettings);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional NotificationSettings groupNotificationSettings = 18;
  var $groupNotificationSettings = message.groupNotificationSettings;
  if ($groupNotificationSettings !== undefined) {
    buffer.writeVarint32(146);
    var nested = proto.encodeNotificationSettings($groupNotificationSettings);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ChatLockSettings chatLockSettings = 19;
  var $chatLockSettings = message.chatLockSettings;
  if ($chatLockSettings !== undefined) {
    buffer.writeVarint32(154);
    var nested = proto.encodeChatLockSettings($chatLockSettings);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeGlobalSettings = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional WallpaperSettings lightThemeWallpaper = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.lightThemeWallpaper = proto.decodeWallpaperSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MediaVisibility mediaVisibility = 2;
    case 2: {
      message.mediaVisibility = proto.decodeMediaVisibility[buffer.readVarint32()];
      break;
    }

    // optional WallpaperSettings darkThemeWallpaper = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.darkThemeWallpaper = proto.decodeWallpaperSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional AutoDownloadSettings autoDownloadWiFi = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.autoDownloadWiFi = proto.decodeAutoDownloadSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional AutoDownloadSettings autoDownloadCellular = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.autoDownloadCellular = proto.decodeAutoDownloadSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional AutoDownloadSettings autoDownloadRoaming = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.autoDownloadRoaming = proto.decodeAutoDownloadSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool showIndividualNotificationsPreview = 7;
    case 7: {
      message.showIndividualNotificationsPreview = !!buffer.readByte();
      break;
    }

    // optional bool showGroupNotificationsPreview = 8;
    case 8: {
      message.showGroupNotificationsPreview = !!buffer.readByte();
      break;
    }

    // optional int32 disappearingModeDuration = 9;
    case 9: {
      message.disappearingModeDuration = buffer.readVarint32();
      break;
    }

    // optional int64 disappearingModeTimestamp = 10;
    case 10: {
      message.disappearingModeTimestamp = buffer.readVarint64();
      break;
    }

    // optional AvatarUserSettings avatarUserSettings = 11;
    case 11: {
      var limit = $pushTemporaryLength(buffer);
      message.avatarUserSettings = proto.decodeAvatarUserSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional int32 fontSize = 12;
    case 12: {
      message.fontSize = buffer.readVarint32();
      break;
    }

    // optional bool securityNotifications = 13;
    case 13: {
      message.securityNotifications = !!buffer.readByte();
      break;
    }

    // optional bool autoUnarchiveChats = 14;
    case 14: {
      message.autoUnarchiveChats = !!buffer.readByte();
      break;
    }

    // optional int32 videoQualityMode = 15;
    case 15: {
      message.videoQualityMode = buffer.readVarint32();
      break;
    }

    // optional int32 photoQualityMode = 16;
    case 16: {
      message.photoQualityMode = buffer.readVarint32();
      break;
    }

    // optional NotificationSettings individualNotificationSettings = 17;
    case 17: {
      var limit = $pushTemporaryLength(buffer);
      message.individualNotificationSettings = proto.decodeNotificationSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional NotificationSettings groupNotificationSettings = 18;
    case 18: {
      var limit = $pushTemporaryLength(buffer);
      message.groupNotificationSettings = proto.decodeNotificationSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ChatLockSettings chatLockSettings = 19;
    case 19: {
      var limit = $pushTemporaryLength(buffer);
      message.chatLockSettings = proto.decodeChatLockSettings(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeGroupMention = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string groupJid = 1;
  var $groupJid = message.groupJid;
  if ($groupJid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($groupJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string groupSubject = 2;
  var $groupSubject = message.groupSubject;
  if ($groupSubject !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($groupSubject), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeGroupMention = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string groupJid = 1;
    case 1: {
      message.groupJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string groupSubject = 2;
    case 2: {
      message.groupSubject = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeGroupParticipant = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // required string userJid = 1;
  var $userJid = message.userJid;
  if ($userJid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($userJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional Rank rank = 2;
  var $rank = message.rank;
  if ($rank !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeRank($rank);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeGroupParticipant = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // required string userJid = 1;
    case 1: {
      message.userJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional Rank rank = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.rank = proto.decodeRank(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  if (message.userJid === undefined)
    throw new Error("Missing required field: userJid");

  return message;
};

proto.encodeHandshakeMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional ClientHello clientHello = 2;
  var $clientHello = message.clientHello;
  if ($clientHello !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeClientHello($clientHello);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ServerHello serverHello = 3;
  var $serverHello = message.serverHello;
  if ($serverHello !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeServerHello($serverHello);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ClientFinish clientFinish = 4;
  var $clientFinish = message.clientFinish;
  if ($clientFinish !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeClientFinish($clientFinish);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeHandshakeMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional ClientHello clientHello = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.clientHello = proto.decodeClientHello(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ServerHello serverHello = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.serverHello = proto.decodeServerHello(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ClientFinish clientFinish = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.clientFinish = proto.decodeClientFinish(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeHistorySync = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // required HistorySyncType syncType = 1;
  var $syncType = message.syncType;
  if ($syncType !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeHistorySyncType($syncType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated Conversation conversations = 2;
  var array$conversations = message.conversations;
  if (array$conversations !== undefined) {
    for (var i = 0; i < array$conversations.length; i++) {
      var $conversations = array$conversations[i];
      var nested = proto.encodeConversation($conversations);
      buffer.writeVarint32(18);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // repeated WebMessageInfo statusV3Messages = 3;
  var array$statusV3Messages = message.statusV3Messages;
  if (array$statusV3Messages !== undefined) {
    for (var i = 0; i < array$statusV3Messages.length; i++) {
      var $statusV3Messages = array$statusV3Messages[i];
      var nested = proto.encodeWebMessageInfo($statusV3Messages);
      buffer.writeVarint32(26);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional uint32 chunkOrder = 5;
  var $chunkOrder = message.chunkOrder;
  if ($chunkOrder !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32($chunkOrder);
  }

  // optional uint32 progress = 6;
  var $progress = message.progress;
  if ($progress !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeVarint32($progress);
  }

  // repeated Pushname pushnames = 7;
  var array$pushnames = message.pushnames;
  if (array$pushnames !== undefined) {
    for (var i = 0; i < array$pushnames.length; i++) {
      var $pushnames = array$pushnames[i];
      var nested = proto.encodePushname($pushnames);
      buffer.writeVarint32(58);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional GlobalSettings globalSettings = 8;
  var $globalSettings = message.globalSettings;
  if ($globalSettings !== undefined) {
    buffer.writeVarint32(66);
    var nested = proto.encodeGlobalSettings($globalSettings);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bytes threadIdUserSecret = 9;
  var $threadIdUserSecret = message.threadIdUserSecret;
  if ($threadIdUserSecret !== undefined) {
    buffer.writeVarint32(74);
    buffer.writeVarint32($threadIdUserSecret.length), buffer.append($threadIdUserSecret);
  }

  // optional uint32 threadDsTimeframeOffset = 10;
  var $threadDsTimeframeOffset = message.threadDsTimeframeOffset;
  if ($threadDsTimeframeOffset !== undefined) {
    buffer.writeVarint32(80);
    buffer.writeVarint32($threadDsTimeframeOffset);
  }

  // repeated StickerMetadata recentStickers = 11;
  var array$recentStickers = message.recentStickers;
  if (array$recentStickers !== undefined) {
    for (var i = 0; i < array$recentStickers.length; i++) {
      var $recentStickers = array$recentStickers[i];
      var nested = proto.encodeStickerMetadata($recentStickers);
      buffer.writeVarint32(90);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // repeated PastParticipants pastParticipants = 12;
  var array$pastParticipants = message.pastParticipants;
  if (array$pastParticipants !== undefined) {
    for (var i = 0; i < array$pastParticipants.length; i++) {
      var $pastParticipants = array$pastParticipants[i];
      var nested = proto.encodePastParticipants($pastParticipants);
      buffer.writeVarint32(98);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // repeated CallLogRecord callLogRecords = 13;
  var array$callLogRecords = message.callLogRecords;
  if (array$callLogRecords !== undefined) {
    for (var i = 0; i < array$callLogRecords.length; i++) {
      var $callLogRecords = array$callLogRecords[i];
      var nested = proto.encodeCallLogRecord($callLogRecords);
      buffer.writeVarint32(106);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional BotAIWaitListState aiWaitListState = 14;
  var $aiWaitListState = message.aiWaitListState;
  if ($aiWaitListState !== undefined) {
    buffer.writeVarint32(114);
    var nested = proto.encodeBotAIWaitListState($aiWaitListState);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated PhoneNumberToLIDMapping phoneNumberToLidMappings = 15;
  var array$phoneNumberToLidMappings = message.phoneNumberToLidMappings;
  if (array$phoneNumberToLidMappings !== undefined) {
    for (var i = 0; i < array$phoneNumberToLidMappings.length; i++) {
      var $phoneNumberToLidMappings = array$phoneNumberToLidMappings[i];
      var nested = proto.encodePhoneNumberToLIDMapping($phoneNumberToLidMappings);
      buffer.writeVarint32(122);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodeHistorySync = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // required HistorySyncType syncType = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.syncType = proto.decodeHistorySyncType(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated Conversation conversations = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.conversations || (message.conversations = []);
      values.push(proto.decodeConversation(buffer));
      buffer.limit = limit;
      break;
    }

    // repeated WebMessageInfo statusV3Messages = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.statusV3Messages || (message.statusV3Messages = []);
      values.push(proto.decodeWebMessageInfo(buffer));
      buffer.limit = limit;
      break;
    }

    // optional uint32 chunkOrder = 5;
    case 5: {
      message.chunkOrder = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 progress = 6;
    case 6: {
      message.progress = buffer.readVarint32() >>> 0;
      break;
    }

    // repeated Pushname pushnames = 7;
    case 7: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.pushnames || (message.pushnames = []);
      values.push(proto.decodePushname(buffer));
      buffer.limit = limit;
      break;
    }

    // optional GlobalSettings globalSettings = 8;
    case 8: {
      var limit = $pushTemporaryLength(buffer);
      message.globalSettings = proto.decodeGlobalSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bytes threadIdUserSecret = 9;
    case 9: {
      message.threadIdUserSecret = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint32 threadDsTimeframeOffset = 10;
    case 10: {
      message.threadDsTimeframeOffset = buffer.readVarint32() >>> 0;
      break;
    }

    // repeated StickerMetadata recentStickers = 11;
    case 11: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.recentStickers || (message.recentStickers = []);
      values.push(proto.decodeStickerMetadata(buffer));
      buffer.limit = limit;
      break;
    }

    // repeated PastParticipants pastParticipants = 12;
    case 12: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.pastParticipants || (message.pastParticipants = []);
      values.push(proto.decodePastParticipants(buffer));
      buffer.limit = limit;
      break;
    }

    // repeated CallLogRecord callLogRecords = 13;
    case 13: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.callLogRecords || (message.callLogRecords = []);
      values.push(proto.decodeCallLogRecord(buffer));
      buffer.limit = limit;
      break;
    }

    // optional BotAIWaitListState aiWaitListState = 14;
    case 14: {
      var limit = $pushTemporaryLength(buffer);
      message.aiWaitListState = proto.decodeBotAIWaitListState(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated PhoneNumberToLIDMapping phoneNumberToLidMappings = 15;
    case 15: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.phoneNumberToLidMappings || (message.phoneNumberToLidMappings = []);
      values.push(proto.decodePhoneNumberToLIDMapping(buffer));
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  if (message.syncType === undefined)
    throw new Error("Missing required field: syncType");

  return message;
};

proto.encodeHistorySyncMsg = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional WebMessageInfo message = 1;
  var $message = message.message;
  if ($message !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeWebMessageInfo($message);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 msgOrderId = 2;
  var $msgOrderId = message.msgOrderId;
  if ($msgOrderId !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($msgOrderId));
  }

  return buffer.flip().toBuffer();
};

proto.decodeHistorySyncMsg = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional WebMessageInfo message = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.message = proto.decodeWebMessageInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 msgOrderId = 2;
    case 2: {
      message.msgOrderId = buffer.readVarint64().toUnsigned();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeHydratedTemplateButton = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 index = 4;
  var $index = message.index;
  if ($index !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint32($index);
  }

  // optional HydratedTemplateButton.HydratedQuickReplyButton quickReplyButton = 1;
  var $quickReplyButton = message.quickReplyButton;
  if ($quickReplyButton !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeHydratedTemplateButton.HydratedQuickReplyButton($quickReplyButton);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional HydratedTemplateButton.HydratedURLButton urlButton = 2;
  var $urlButton = message.urlButton;
  if ($urlButton !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeHydratedTemplateButton.HydratedURLButton($urlButton);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional HydratedTemplateButton.HydratedCallButton callButton = 3;
  var $callButton = message.callButton;
  if ($callButton !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeHydratedTemplateButton.HydratedCallButton($callButton);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeHydratedTemplateButton = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 index = 4;
    case 4: {
      message.index = buffer.readVarint32() >>> 0;
      break;
    }

    // optional HydratedTemplateButton.HydratedQuickReplyButton quickReplyButton = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.quickReplyButton = proto.decodeHydratedTemplateButton.HydratedQuickReplyButton(buffer);
      buffer.limit = limit;
      break;
    }

    // optional HydratedTemplateButton.HydratedURLButton urlButton = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.urlButton = proto.decodeHydratedTemplateButton.HydratedURLButton(buffer);
      buffer.limit = limit;
      break;
    }

    // optional HydratedTemplateButton.HydratedCallButton callButton = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.callButton = proto.decodeHydratedTemplateButton.HydratedCallButton(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeIdentityKeyPairStructure = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes publicKey = 1;
  var $publicKey = message.publicKey;
  if ($publicKey !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($publicKey.length), buffer.append($publicKey);
  }

  // optional bytes privateKey = 2;
  var $privateKey = message.privateKey;
  if ($privateKey !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($privateKey.length), buffer.append($privateKey);
  }

  return buffer.flip().toBuffer();
};

proto.decodeIdentityKeyPairStructure = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes publicKey = 1;
    case 1: {
      message.publicKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes privateKey = 2;
    case 2: {
      message.privateKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeInteractiveAnnotation = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // repeated Point polygonVertices = 1;
  var array$polygonVertices = message.polygonVertices;
  if (array$polygonVertices !== undefined) {
    for (var i = 0; i < array$polygonVertices.length; i++) {
      var $polygonVertices = array$polygonVertices[i];
      var nested = proto.encodePoint($polygonVertices);
      buffer.writeVarint32(10);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional bool shouldSkipConfirmation = 4;
  var $shouldSkipConfirmation = message.shouldSkipConfirmation;
  if ($shouldSkipConfirmation !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeByte($shouldSkipConfirmation ? 1 : 0);
  }

  // optional Location location = 2;
  var $location = message.location;
  if ($location !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeLocation($location);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ContextInfo.ForwardedNewsletterMessageInfo newsletter = 3;
  var $newsletter = message.newsletter;
  if ($newsletter !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeContextInfo.ForwardedNewsletterMessageInfo($newsletter);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeInteractiveAnnotation = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // repeated Point polygonVertices = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.polygonVertices || (message.polygonVertices = []);
      values.push(proto.decodePoint(buffer));
      buffer.limit = limit;
      break;
    }

    // optional bool shouldSkipConfirmation = 4;
    case 4: {
      message.shouldSkipConfirmation = !!buffer.readByte();
      break;
    }

    // optional Location location = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.location = proto.decodeLocation(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ContextInfo.ForwardedNewsletterMessageInfo newsletter = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.newsletter = proto.decodeContextInfo.ForwardedNewsletterMessageInfo(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeKeepInChat = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional KeepType keepType = 1;
  var $keepType = message.keepType;
  if ($keepType !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32(proto.encodeKeepType[$keepType]);
  }

  // optional int64 serverTimestamp = 2;
  var $serverTimestamp = message.serverTimestamp;
  if ($serverTimestamp !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($serverTimestamp));
  }

  // optional MessageKey key = 3;
  var $key = message.key;
  if ($key !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeMessageKey($key);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string deviceJid = 4;
  var $deviceJid = message.deviceJid;
  if ($deviceJid !== undefined) {
    buffer.writeVarint32(34);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($deviceJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional int64 clientTimestampMs = 5;
  var $clientTimestampMs = message.clientTimestampMs;
  if ($clientTimestampMs !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint64($coerceLong($clientTimestampMs));
  }

  // optional int64 serverTimestampMs = 6;
  var $serverTimestampMs = message.serverTimestampMs;
  if ($serverTimestampMs !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeVarint64($coerceLong($serverTimestampMs));
  }

  return buffer.flip().toBuffer();
};

proto.decodeKeepInChat = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional KeepType keepType = 1;
    case 1: {
      message.keepType = proto.decodeKeepType[buffer.readVarint32()];
      break;
    }

    // optional int64 serverTimestamp = 2;
    case 2: {
      message.serverTimestamp = buffer.readVarint64();
      break;
    }

    // optional MessageKey key = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.key = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string deviceJid = 4;
    case 4: {
      message.deviceJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional int64 clientTimestampMs = 5;
    case 5: {
      message.clientTimestampMs = buffer.readVarint64();
      break;
    }

    // optional int64 serverTimestampMs = 6;
    case 6: {
      message.serverTimestampMs = buffer.readVarint64();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeKeyExchangeMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($id);
  }

  // optional bytes baseKey = 2;
  var $baseKey = message.baseKey;
  if ($baseKey !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($baseKey.length), buffer.append($baseKey);
  }

  // optional bytes ratchetKey = 3;
  var $ratchetKey = message.ratchetKey;
  if ($ratchetKey !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($ratchetKey.length), buffer.append($ratchetKey);
  }

  // optional bytes identityKey = 4;
  var $identityKey = message.identityKey;
  if ($identityKey !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($identityKey.length), buffer.append($identityKey);
  }

  // optional bytes baseKeySignature = 5;
  var $baseKeySignature = message.baseKeySignature;
  if ($baseKeySignature !== undefined) {
    buffer.writeVarint32(42);
    buffer.writeVarint32($baseKeySignature.length), buffer.append($baseKeySignature);
  }

  return buffer.flip().toBuffer();
};

proto.decodeKeyExchangeMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 id = 1;
    case 1: {
      message.id = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes baseKey = 2;
    case 2: {
      message.baseKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes ratchetKey = 3;
    case 3: {
      message.ratchetKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes identityKey = 4;
    case 4: {
      message.identityKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes baseKeySignature = 5;
    case 5: {
      message.baseKeySignature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeKeyId = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($id.length), buffer.append($id);
  }

  return buffer.flip().toBuffer();
};

proto.decodeKeyId = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes id = 1;
    case 1: {
      message.id = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeLocalizedName = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string lg = 1;
  var $lg = message.lg;
  if ($lg !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($lg), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string lc = 2;
  var $lc = message.lc;
  if ($lc !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($lc), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string verifiedName = 3;
  var $verifiedName = message.verifiedName;
  if ($verifiedName !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($verifiedName), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeLocalizedName = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string lg = 1;
    case 1: {
      message.lg = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string lc = 2;
    case 2: {
      message.lc = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string verifiedName = 3;
    case 3: {
      message.verifiedName = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeLocation = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional double degreesLatitude = 1;
  var $degreesLatitude = message.degreesLatitude;
  if ($degreesLatitude !== undefined) {
    buffer.writeVarint32(9);
    buffer.writeDouble($degreesLatitude);
  }

  // optional double degreesLongitude = 2;
  var $degreesLongitude = message.degreesLongitude;
  if ($degreesLongitude !== undefined) {
    buffer.writeVarint32(17);
    buffer.writeDouble($degreesLongitude);
  }

  // optional string name = 3;
  var $name = message.name;
  if ($name !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($name), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeLocation = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional double degreesLatitude = 1;
    case 1: {
      message.degreesLatitude = buffer.readDouble();
      break;
    }

    // optional double degreesLongitude = 2;
    case 2: {
      message.degreesLongitude = buffer.readDouble();
      break;
    }

    // optional string name = 3;
    case 3: {
      message.name = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMediaData = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string localPath = 1;
  var $localPath = message.localPath;
  if ($localPath !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($localPath), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMediaData = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string localPath = 1;
    case 1: {
      message.localPath = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMediaEntry = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes fileSha256 = 1;
  var $fileSha256 = message.fileSha256;
  if ($fileSha256 !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($fileSha256.length), buffer.append($fileSha256);
  }

  // optional bytes mediaKey = 2;
  var $mediaKey = message.mediaKey;
  if ($mediaKey !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($mediaKey.length), buffer.append($mediaKey);
  }

  // optional bytes fileEncSha256 = 3;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($fileEncSha256.length), buffer.append($fileEncSha256);
  }

  // optional string directPath = 4;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    buffer.writeVarint32(34);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($directPath), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional int64 mediaKeyTimestamp = 5;
  var $mediaKeyTimestamp = message.mediaKeyTimestamp;
  if ($mediaKeyTimestamp !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint64($coerceLong($mediaKeyTimestamp));
  }

  // optional string serverMediaType = 6;
  var $serverMediaType = message.serverMediaType;
  if ($serverMediaType !== undefined) {
    buffer.writeVarint32(50);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($serverMediaType), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes uploadToken = 7;
  var $uploadToken = message.uploadToken;
  if ($uploadToken !== undefined) {
    buffer.writeVarint32(58);
    buffer.writeVarint32($uploadToken.length), buffer.append($uploadToken);
  }

  // optional bytes validatedTimestamp = 8;
  var $validatedTimestamp = message.validatedTimestamp;
  if ($validatedTimestamp !== undefined) {
    buffer.writeVarint32(66);
    buffer.writeVarint32($validatedTimestamp.length), buffer.append($validatedTimestamp);
  }

  // optional bytes sidecar = 9;
  var $sidecar = message.sidecar;
  if ($sidecar !== undefined) {
    buffer.writeVarint32(74);
    buffer.writeVarint32($sidecar.length), buffer.append($sidecar);
  }

  // optional string objectId = 10;
  var $objectId = message.objectId;
  if ($objectId !== undefined) {
    buffer.writeVarint32(82);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($objectId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string fbid = 11;
  var $fbid = message.fbid;
  if ($fbid !== undefined) {
    buffer.writeVarint32(90);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($fbid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional DownloadableThumbnail downloadableThumbnail = 12;
  var $downloadableThumbnail = message.downloadableThumbnail;
  if ($downloadableThumbnail !== undefined) {
    buffer.writeVarint32(98);
    var nested = proto.encodeDownloadableThumbnail($downloadableThumbnail);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string handle = 13;
  var $handle = message.handle;
  if ($handle !== undefined) {
    buffer.writeVarint32(106);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($handle), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string filename = 14;
  var $filename = message.filename;
  if ($filename !== undefined) {
    buffer.writeVarint32(114);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($filename), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional ProgressiveJpegDetails progressiveJpegDetails = 15;
  var $progressiveJpegDetails = message.progressiveJpegDetails;
  if ($progressiveJpegDetails !== undefined) {
    buffer.writeVarint32(122);
    var nested = proto.encodeProgressiveJpegDetails($progressiveJpegDetails);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMediaEntry = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes fileSha256 = 1;
    case 1: {
      message.fileSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes mediaKey = 2;
    case 2: {
      message.mediaKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes fileEncSha256 = 3;
    case 3: {
      message.fileEncSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string directPath = 4;
    case 4: {
      message.directPath = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional int64 mediaKeyTimestamp = 5;
    case 5: {
      message.mediaKeyTimestamp = buffer.readVarint64();
      break;
    }

    // optional string serverMediaType = 6;
    case 6: {
      message.serverMediaType = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes uploadToken = 7;
    case 7: {
      message.uploadToken = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes validatedTimestamp = 8;
    case 8: {
      message.validatedTimestamp = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes sidecar = 9;
    case 9: {
      message.sidecar = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string objectId = 10;
    case 10: {
      message.objectId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string fbid = 11;
    case 11: {
      message.fbid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional DownloadableThumbnail downloadableThumbnail = 12;
    case 12: {
      var limit = $pushTemporaryLength(buffer);
      message.downloadableThumbnail = proto.decodeDownloadableThumbnail(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string handle = 13;
    case 13: {
      message.handle = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string filename = 14;
    case 14: {
      message.filename = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional ProgressiveJpegDetails progressiveJpegDetails = 15;
    case 15: {
      var limit = $pushTemporaryLength(buffer);
      message.progressiveJpegDetails = proto.decodeProgressiveJpegDetails(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMediaNotifyMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string expressPathUrl = 1;
  var $expressPathUrl = message.expressPathUrl;
  if ($expressPathUrl !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($expressPathUrl), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes fileEncSha256 = 2;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($fileEncSha256.length), buffer.append($fileEncSha256);
  }

  // optional uint64 fileLength = 3;
  var $fileLength = message.fileLength;
  if ($fileLength !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($fileLength));
  }

  return buffer.flip().toBuffer();
};

proto.decodeMediaNotifyMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string expressPathUrl = 1;
    case 1: {
      message.expressPathUrl = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes fileEncSha256 = 2;
    case 2: {
      message.fileEncSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint64 fileLength = 3;
    case 3: {
      message.fileLength = buffer.readVarint64().toUnsigned();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMediaRetryNotification = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string stanzaId = 1;
  var $stanzaId = message.stanzaId;
  if ($stanzaId !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($stanzaId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string directPath = 2;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($directPath), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional ResultType result = 3;
  var $result = message.result;
  if ($result !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeResultType($result);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMediaRetryNotification = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string stanzaId = 1;
    case 1: {
      message.stanzaId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string directPath = 2;
    case 2: {
      message.directPath = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional ResultType result = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.result = proto.decodeResultType(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string conversation = 1;
  var $conversation = message.conversation;
  if ($conversation !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($conversation), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional SenderKeyDistributionMessage senderKeyDistributionMessage = 2;
  var $senderKeyDistributionMessage = message.senderKeyDistributionMessage;
  if ($senderKeyDistributionMessage !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeSenderKeyDistributionMessage($senderKeyDistributionMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ImageMessage imageMessage = 3;
  var $imageMessage = message.imageMessage;
  if ($imageMessage !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeImageMessage($imageMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ContactMessage contactMessage = 4;
  var $contactMessage = message.contactMessage;
  if ($contactMessage !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeContactMessage($contactMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional LocationMessage locationMessage = 5;
  var $locationMessage = message.locationMessage;
  if ($locationMessage !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeLocationMessage($locationMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ExtendedTextMessage extendedTextMessage = 6;
  var $extendedTextMessage = message.extendedTextMessage;
  if ($extendedTextMessage !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeExtendedTextMessage($extendedTextMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional DocumentMessage documentMessage = 7;
  var $documentMessage = message.documentMessage;
  if ($documentMessage !== undefined) {
    buffer.writeVarint32(58);
    var nested = proto.encodeDocumentMessage($documentMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional AudioMessage audioMessage = 8;
  var $audioMessage = message.audioMessage;
  if ($audioMessage !== undefined) {
    buffer.writeVarint32(66);
    var nested = proto.encodeAudioMessage($audioMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional VideoMessage videoMessage = 9;
  var $videoMessage = message.videoMessage;
  if ($videoMessage !== undefined) {
    buffer.writeVarint32(74);
    var nested = proto.encodeVideoMessage($videoMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Call call = 10;
  var $call = message.call;
  if ($call !== undefined) {
    buffer.writeVarint32(82);
    var nested = proto.encodeCall($call);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Chat chat = 11;
  var $chat = message.chat;
  if ($chat !== undefined) {
    buffer.writeVarint32(90);
    var nested = proto.encodeChat($chat);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ProtocolMessage protocolMessage = 12;
  var $protocolMessage = message.protocolMessage;
  if ($protocolMessage !== undefined) {
    buffer.writeVarint32(98);
    var nested = proto.encodeProtocolMessage($protocolMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ContactsArrayMessage contactsArrayMessage = 13;
  var $contactsArrayMessage = message.contactsArrayMessage;
  if ($contactsArrayMessage !== undefined) {
    buffer.writeVarint32(106);
    var nested = proto.encodeContactsArrayMessage($contactsArrayMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional HighlyStructuredMessage highlyStructuredMessage = 14;
  var $highlyStructuredMessage = message.highlyStructuredMessage;
  if ($highlyStructuredMessage !== undefined) {
    buffer.writeVarint32(114);
    var nested = proto.encodeHighlyStructuredMessage($highlyStructuredMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SenderKeyDistributionMessage fastRatchetKeySenderKeyDistributionMessage = 15;
  var $fastRatchetKeySenderKeyDistributionMessage = message.fastRatchetKeySenderKeyDistributionMessage;
  if ($fastRatchetKeySenderKeyDistributionMessage !== undefined) {
    buffer.writeVarint32(122);
    var nested = proto.encodeSenderKeyDistributionMessage($fastRatchetKeySenderKeyDistributionMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SendPaymentMessage sendPaymentMessage = 16;
  var $sendPaymentMessage = message.sendPaymentMessage;
  if ($sendPaymentMessage !== undefined) {
    buffer.writeVarint32(130);
    var nested = proto.encodeSendPaymentMessage($sendPaymentMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional LiveLocationMessage liveLocationMessage = 18;
  var $liveLocationMessage = message.liveLocationMessage;
  if ($liveLocationMessage !== undefined) {
    buffer.writeVarint32(146);
    var nested = proto.encodeLiveLocationMessage($liveLocationMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional RequestPaymentMessage requestPaymentMessage = 22;
  var $requestPaymentMessage = message.requestPaymentMessage;
  if ($requestPaymentMessage !== undefined) {
    buffer.writeVarint32(178);
    var nested = proto.encodeRequestPaymentMessage($requestPaymentMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional DeclinePaymentRequestMessage declinePaymentRequestMessage = 23;
  var $declinePaymentRequestMessage = message.declinePaymentRequestMessage;
  if ($declinePaymentRequestMessage !== undefined) {
    buffer.writeVarint32(186);
    var nested = proto.encodeDeclinePaymentRequestMessage($declinePaymentRequestMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional CancelPaymentRequestMessage cancelPaymentRequestMessage = 24;
  var $cancelPaymentRequestMessage = message.cancelPaymentRequestMessage;
  if ($cancelPaymentRequestMessage !== undefined) {
    buffer.writeVarint32(194);
    var nested = proto.encodeCancelPaymentRequestMessage($cancelPaymentRequestMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional TemplateMessage templateMessage = 25;
  var $templateMessage = message.templateMessage;
  if ($templateMessage !== undefined) {
    buffer.writeVarint32(202);
    var nested = proto.encodeTemplateMessage($templateMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional StickerMessage stickerMessage = 26;
  var $stickerMessage = message.stickerMessage;
  if ($stickerMessage !== undefined) {
    buffer.writeVarint32(210);
    var nested = proto.encodeStickerMessage($stickerMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional GroupInviteMessage groupInviteMessage = 28;
  var $groupInviteMessage = message.groupInviteMessage;
  if ($groupInviteMessage !== undefined) {
    buffer.writeVarint32(226);
    var nested = proto.encodeGroupInviteMessage($groupInviteMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional TemplateButtonReplyMessage templateButtonReplyMessage = 29;
  var $templateButtonReplyMessage = message.templateButtonReplyMessage;
  if ($templateButtonReplyMessage !== undefined) {
    buffer.writeVarint32(234);
    var nested = proto.encodeTemplateButtonReplyMessage($templateButtonReplyMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ProductMessage productMessage = 30;
  var $productMessage = message.productMessage;
  if ($productMessage !== undefined) {
    buffer.writeVarint32(242);
    var nested = proto.encodeProductMessage($productMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional DeviceSentMessage deviceSentMessage = 31;
  var $deviceSentMessage = message.deviceSentMessage;
  if ($deviceSentMessage !== undefined) {
    buffer.writeVarint32(250);
    var nested = proto.encodeDeviceSentMessage($deviceSentMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MessageContextInfo messageContextInfo = 35;
  var $messageContextInfo = message.messageContextInfo;
  if ($messageContextInfo !== undefined) {
    buffer.writeVarint32(282);
    var nested = proto.encodeMessageContextInfo($messageContextInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ListMessage listMessage = 36;
  var $listMessage = message.listMessage;
  if ($listMessage !== undefined) {
    buffer.writeVarint32(290);
    var nested = proto.encodeListMessage($listMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage viewOnceMessage = 37;
  var $viewOnceMessage = message.viewOnceMessage;
  if ($viewOnceMessage !== undefined) {
    buffer.writeVarint32(298);
    var nested = proto.encodeFutureProofMessage($viewOnceMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional OrderMessage orderMessage = 38;
  var $orderMessage = message.orderMessage;
  if ($orderMessage !== undefined) {
    buffer.writeVarint32(306);
    var nested = proto.encodeOrderMessage($orderMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ListResponseMessage listResponseMessage = 39;
  var $listResponseMessage = message.listResponseMessage;
  if ($listResponseMessage !== undefined) {
    buffer.writeVarint32(314);
    var nested = proto.encodeListResponseMessage($listResponseMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage ephemeralMessage = 40;
  var $ephemeralMessage = message.ephemeralMessage;
  if ($ephemeralMessage !== undefined) {
    buffer.writeVarint32(322);
    var nested = proto.encodeFutureProofMessage($ephemeralMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional InvoiceMessage invoiceMessage = 41;
  var $invoiceMessage = message.invoiceMessage;
  if ($invoiceMessage !== undefined) {
    buffer.writeVarint32(330);
    var nested = proto.encodeInvoiceMessage($invoiceMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ButtonsMessage buttonsMessage = 42;
  var $buttonsMessage = message.buttonsMessage;
  if ($buttonsMessage !== undefined) {
    buffer.writeVarint32(338);
    var nested = proto.encodeButtonsMessage($buttonsMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ButtonsResponseMessage buttonsResponseMessage = 43;
  var $buttonsResponseMessage = message.buttonsResponseMessage;
  if ($buttonsResponseMessage !== undefined) {
    buffer.writeVarint32(346);
    var nested = proto.encodeButtonsResponseMessage($buttonsResponseMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PaymentInviteMessage paymentInviteMessage = 44;
  var $paymentInviteMessage = message.paymentInviteMessage;
  if ($paymentInviteMessage !== undefined) {
    buffer.writeVarint32(354);
    var nested = proto.encodePaymentInviteMessage($paymentInviteMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional InteractiveMessage interactiveMessage = 45;
  var $interactiveMessage = message.interactiveMessage;
  if ($interactiveMessage !== undefined) {
    buffer.writeVarint32(362);
    var nested = proto.encodeInteractiveMessage($interactiveMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ReactionMessage reactionMessage = 46;
  var $reactionMessage = message.reactionMessage;
  if ($reactionMessage !== undefined) {
    buffer.writeVarint32(370);
    var nested = proto.encodeReactionMessage($reactionMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional StickerSyncRMRMessage stickerSyncRmrMessage = 47;
  var $stickerSyncRmrMessage = message.stickerSyncRmrMessage;
  if ($stickerSyncRmrMessage !== undefined) {
    buffer.writeVarint32(378);
    var nested = proto.encodeStickerSyncRMRMessage($stickerSyncRmrMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional InteractiveResponseMessage interactiveResponseMessage = 48;
  var $interactiveResponseMessage = message.interactiveResponseMessage;
  if ($interactiveResponseMessage !== undefined) {
    buffer.writeVarint32(386);
    var nested = proto.encodeInteractiveResponseMessage($interactiveResponseMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PollCreationMessage pollCreationMessage = 49;
  var $pollCreationMessage = message.pollCreationMessage;
  if ($pollCreationMessage !== undefined) {
    buffer.writeVarint32(394);
    var nested = proto.encodePollCreationMessage($pollCreationMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PollUpdateMessage pollUpdateMessage = 50;
  var $pollUpdateMessage = message.pollUpdateMessage;
  if ($pollUpdateMessage !== undefined) {
    buffer.writeVarint32(402);
    var nested = proto.encodePollUpdateMessage($pollUpdateMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional KeepInChatMessage keepInChatMessage = 51;
  var $keepInChatMessage = message.keepInChatMessage;
  if ($keepInChatMessage !== undefined) {
    buffer.writeVarint32(410);
    var nested = proto.encodeKeepInChatMessage($keepInChatMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage documentWithCaptionMessage = 53;
  var $documentWithCaptionMessage = message.documentWithCaptionMessage;
  if ($documentWithCaptionMessage !== undefined) {
    buffer.writeVarint32(426);
    var nested = proto.encodeFutureProofMessage($documentWithCaptionMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional RequestPhoneNumberMessage requestPhoneNumberMessage = 54;
  var $requestPhoneNumberMessage = message.requestPhoneNumberMessage;
  if ($requestPhoneNumberMessage !== undefined) {
    buffer.writeVarint32(434);
    var nested = proto.encodeRequestPhoneNumberMessage($requestPhoneNumberMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage viewOnceMessageV2 = 55;
  var $viewOnceMessageV2 = message.viewOnceMessageV2;
  if ($viewOnceMessageV2 !== undefined) {
    buffer.writeVarint32(442);
    var nested = proto.encodeFutureProofMessage($viewOnceMessageV2);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional EncReactionMessage encReactionMessage = 56;
  var $encReactionMessage = message.encReactionMessage;
  if ($encReactionMessage !== undefined) {
    buffer.writeVarint32(450);
    var nested = proto.encodeEncReactionMessage($encReactionMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage editedMessage = 58;
  var $editedMessage = message.editedMessage;
  if ($editedMessage !== undefined) {
    buffer.writeVarint32(466);
    var nested = proto.encodeFutureProofMessage($editedMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage viewOnceMessageV2Extension = 59;
  var $viewOnceMessageV2Extension = message.viewOnceMessageV2Extension;
  if ($viewOnceMessageV2Extension !== undefined) {
    buffer.writeVarint32(474);
    var nested = proto.encodeFutureProofMessage($viewOnceMessageV2Extension);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PollCreationMessage pollCreationMessageV2 = 60;
  var $pollCreationMessageV2 = message.pollCreationMessageV2;
  if ($pollCreationMessageV2 !== undefined) {
    buffer.writeVarint32(482);
    var nested = proto.encodePollCreationMessage($pollCreationMessageV2);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ScheduledCallCreationMessage scheduledCallCreationMessage = 61;
  var $scheduledCallCreationMessage = message.scheduledCallCreationMessage;
  if ($scheduledCallCreationMessage !== undefined) {
    buffer.writeVarint32(490);
    var nested = proto.encodeScheduledCallCreationMessage($scheduledCallCreationMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage groupMentionedMessage = 62;
  var $groupMentionedMessage = message.groupMentionedMessage;
  if ($groupMentionedMessage !== undefined) {
    buffer.writeVarint32(498);
    var nested = proto.encodeFutureProofMessage($groupMentionedMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PinInChatMessage pinInChatMessage = 63;
  var $pinInChatMessage = message.pinInChatMessage;
  if ($pinInChatMessage !== undefined) {
    buffer.writeVarint32(506);
    var nested = proto.encodePinInChatMessage($pinInChatMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PollCreationMessage pollCreationMessageV3 = 64;
  var $pollCreationMessageV3 = message.pollCreationMessageV3;
  if ($pollCreationMessageV3 !== undefined) {
    buffer.writeVarint32(514);
    var nested = proto.encodePollCreationMessage($pollCreationMessageV3);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ScheduledCallEditMessage scheduledCallEditMessage = 65;
  var $scheduledCallEditMessage = message.scheduledCallEditMessage;
  if ($scheduledCallEditMessage !== undefined) {
    buffer.writeVarint32(522);
    var nested = proto.encodeScheduledCallEditMessage($scheduledCallEditMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional VideoMessage ptvMessage = 66;
  var $ptvMessage = message.ptvMessage;
  if ($ptvMessage !== undefined) {
    buffer.writeVarint32(530);
    var nested = proto.encodeVideoMessage($ptvMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage botInvokeMessage = 67;
  var $botInvokeMessage = message.botInvokeMessage;
  if ($botInvokeMessage !== undefined) {
    buffer.writeVarint32(538);
    var nested = proto.encodeFutureProofMessage($botInvokeMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional CallLogMessage callLogMesssage = 69;
  var $callLogMesssage = message.callLogMesssage;
  if ($callLogMesssage !== undefined) {
    buffer.writeVarint32(554);
    var nested = proto.encodeCallLogMessage($callLogMesssage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MessageHistoryBundle messageHistoryBundle = 70;
  var $messageHistoryBundle = message.messageHistoryBundle;
  if ($messageHistoryBundle !== undefined) {
    buffer.writeVarint32(562);
    var nested = proto.encodeMessageHistoryBundle($messageHistoryBundle);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional EncCommentMessage encCommentMessage = 71;
  var $encCommentMessage = message.encCommentMessage;
  if ($encCommentMessage !== undefined) {
    buffer.writeVarint32(570);
    var nested = proto.encodeEncCommentMessage($encCommentMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional BCallMessage bcallMessage = 72;
  var $bcallMessage = message.bcallMessage;
  if ($bcallMessage !== undefined) {
    buffer.writeVarint32(578);
    var nested = proto.encodeBCallMessage($bcallMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional FutureProofMessage lottieStickerMessage = 74;
  var $lottieStickerMessage = message.lottieStickerMessage;
  if ($lottieStickerMessage !== undefined) {
    buffer.writeVarint32(594);
    var nested = proto.encodeFutureProofMessage($lottieStickerMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional EventMessage eventMessage = 75;
  var $eventMessage = message.eventMessage;
  if ($eventMessage !== undefined) {
    buffer.writeVarint32(602);
    var nested = proto.encodeEventMessage($eventMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional EncEventResponseMessage encEventResponseMessage = 76;
  var $encEventResponseMessage = message.encEventResponseMessage;
  if ($encEventResponseMessage !== undefined) {
    buffer.writeVarint32(610);
    var nested = proto.encodeEncEventResponseMessage($encEventResponseMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional CommentMessage commentMessage = 77;
  var $commentMessage = message.commentMessage;
  if ($commentMessage !== undefined) {
    buffer.writeVarint32(618);
    var nested = proto.encodeCommentMessage($commentMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional NewsletterAdminInviteMessage newsletterAdminInviteMessage = 78;
  var $newsletterAdminInviteMessage = message.newsletterAdminInviteMessage;
  if ($newsletterAdminInviteMessage !== undefined) {
    buffer.writeVarint32(626);
    var nested = proto.encodeNewsletterAdminInviteMessage($newsletterAdminInviteMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PlaceholderMessage placeholderMessage = 80;
  var $placeholderMessage = message.placeholderMessage;
  if ($placeholderMessage !== undefined) {
    buffer.writeVarint32(642);
    var nested = proto.encodePlaceholderMessage($placeholderMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SecretEncryptedMessage secretEncryptedMessage = 82;
  var $secretEncryptedMessage = message.secretEncryptedMessage;
  if ($secretEncryptedMessage !== undefined) {
    buffer.writeVarint32(658);
    var nested = proto.encodeSecretEncryptedMessage($secretEncryptedMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string conversation = 1;
    case 1: {
      message.conversation = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional SenderKeyDistributionMessage senderKeyDistributionMessage = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.senderKeyDistributionMessage = proto.decodeSenderKeyDistributionMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ImageMessage imageMessage = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.imageMessage = proto.decodeImageMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ContactMessage contactMessage = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.contactMessage = proto.decodeContactMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional LocationMessage locationMessage = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.locationMessage = proto.decodeLocationMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ExtendedTextMessage extendedTextMessage = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.extendedTextMessage = proto.decodeExtendedTextMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional DocumentMessage documentMessage = 7;
    case 7: {
      var limit = $pushTemporaryLength(buffer);
      message.documentMessage = proto.decodeDocumentMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional AudioMessage audioMessage = 8;
    case 8: {
      var limit = $pushTemporaryLength(buffer);
      message.audioMessage = proto.decodeAudioMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional VideoMessage videoMessage = 9;
    case 9: {
      var limit = $pushTemporaryLength(buffer);
      message.videoMessage = proto.decodeVideoMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Call call = 10;
    case 10: {
      var limit = $pushTemporaryLength(buffer);
      message.call = proto.decodeCall(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Chat chat = 11;
    case 11: {
      var limit = $pushTemporaryLength(buffer);
      message.chat = proto.decodeChat(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ProtocolMessage protocolMessage = 12;
    case 12: {
      var limit = $pushTemporaryLength(buffer);
      message.protocolMessage = proto.decodeProtocolMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ContactsArrayMessage contactsArrayMessage = 13;
    case 13: {
      var limit = $pushTemporaryLength(buffer);
      message.contactsArrayMessage = proto.decodeContactsArrayMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional HighlyStructuredMessage highlyStructuredMessage = 14;
    case 14: {
      var limit = $pushTemporaryLength(buffer);
      message.highlyStructuredMessage = proto.decodeHighlyStructuredMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SenderKeyDistributionMessage fastRatchetKeySenderKeyDistributionMessage = 15;
    case 15: {
      var limit = $pushTemporaryLength(buffer);
      message.fastRatchetKeySenderKeyDistributionMessage = proto.decodeSenderKeyDistributionMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SendPaymentMessage sendPaymentMessage = 16;
    case 16: {
      var limit = $pushTemporaryLength(buffer);
      message.sendPaymentMessage = proto.decodeSendPaymentMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional LiveLocationMessage liveLocationMessage = 18;
    case 18: {
      var limit = $pushTemporaryLength(buffer);
      message.liveLocationMessage = proto.decodeLiveLocationMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional RequestPaymentMessage requestPaymentMessage = 22;
    case 22: {
      var limit = $pushTemporaryLength(buffer);
      message.requestPaymentMessage = proto.decodeRequestPaymentMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional DeclinePaymentRequestMessage declinePaymentRequestMessage = 23;
    case 23: {
      var limit = $pushTemporaryLength(buffer);
      message.declinePaymentRequestMessage = proto.decodeDeclinePaymentRequestMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional CancelPaymentRequestMessage cancelPaymentRequestMessage = 24;
    case 24: {
      var limit = $pushTemporaryLength(buffer);
      message.cancelPaymentRequestMessage = proto.decodeCancelPaymentRequestMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional TemplateMessage templateMessage = 25;
    case 25: {
      var limit = $pushTemporaryLength(buffer);
      message.templateMessage = proto.decodeTemplateMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional StickerMessage stickerMessage = 26;
    case 26: {
      var limit = $pushTemporaryLength(buffer);
      message.stickerMessage = proto.decodeStickerMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional GroupInviteMessage groupInviteMessage = 28;
    case 28: {
      var limit = $pushTemporaryLength(buffer);
      message.groupInviteMessage = proto.decodeGroupInviteMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional TemplateButtonReplyMessage templateButtonReplyMessage = 29;
    case 29: {
      var limit = $pushTemporaryLength(buffer);
      message.templateButtonReplyMessage = proto.decodeTemplateButtonReplyMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ProductMessage productMessage = 30;
    case 30: {
      var limit = $pushTemporaryLength(buffer);
      message.productMessage = proto.decodeProductMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional DeviceSentMessage deviceSentMessage = 31;
    case 31: {
      var limit = $pushTemporaryLength(buffer);
      message.deviceSentMessage = proto.decodeDeviceSentMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MessageContextInfo messageContextInfo = 35;
    case 35: {
      var limit = $pushTemporaryLength(buffer);
      message.messageContextInfo = proto.decodeMessageContextInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ListMessage listMessage = 36;
    case 36: {
      var limit = $pushTemporaryLength(buffer);
      message.listMessage = proto.decodeListMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage viewOnceMessage = 37;
    case 37: {
      var limit = $pushTemporaryLength(buffer);
      message.viewOnceMessage = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional OrderMessage orderMessage = 38;
    case 38: {
      var limit = $pushTemporaryLength(buffer);
      message.orderMessage = proto.decodeOrderMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ListResponseMessage listResponseMessage = 39;
    case 39: {
      var limit = $pushTemporaryLength(buffer);
      message.listResponseMessage = proto.decodeListResponseMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage ephemeralMessage = 40;
    case 40: {
      var limit = $pushTemporaryLength(buffer);
      message.ephemeralMessage = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional InvoiceMessage invoiceMessage = 41;
    case 41: {
      var limit = $pushTemporaryLength(buffer);
      message.invoiceMessage = proto.decodeInvoiceMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ButtonsMessage buttonsMessage = 42;
    case 42: {
      var limit = $pushTemporaryLength(buffer);
      message.buttonsMessage = proto.decodeButtonsMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ButtonsResponseMessage buttonsResponseMessage = 43;
    case 43: {
      var limit = $pushTemporaryLength(buffer);
      message.buttonsResponseMessage = proto.decodeButtonsResponseMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PaymentInviteMessage paymentInviteMessage = 44;
    case 44: {
      var limit = $pushTemporaryLength(buffer);
      message.paymentInviteMessage = proto.decodePaymentInviteMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional InteractiveMessage interactiveMessage = 45;
    case 45: {
      var limit = $pushTemporaryLength(buffer);
      message.interactiveMessage = proto.decodeInteractiveMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ReactionMessage reactionMessage = 46;
    case 46: {
      var limit = $pushTemporaryLength(buffer);
      message.reactionMessage = proto.decodeReactionMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional StickerSyncRMRMessage stickerSyncRmrMessage = 47;
    case 47: {
      var limit = $pushTemporaryLength(buffer);
      message.stickerSyncRmrMessage = proto.decodeStickerSyncRMRMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional InteractiveResponseMessage interactiveResponseMessage = 48;
    case 48: {
      var limit = $pushTemporaryLength(buffer);
      message.interactiveResponseMessage = proto.decodeInteractiveResponseMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PollCreationMessage pollCreationMessage = 49;
    case 49: {
      var limit = $pushTemporaryLength(buffer);
      message.pollCreationMessage = proto.decodePollCreationMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PollUpdateMessage pollUpdateMessage = 50;
    case 50: {
      var limit = $pushTemporaryLength(buffer);
      message.pollUpdateMessage = proto.decodePollUpdateMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional KeepInChatMessage keepInChatMessage = 51;
    case 51: {
      var limit = $pushTemporaryLength(buffer);
      message.keepInChatMessage = proto.decodeKeepInChatMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage documentWithCaptionMessage = 53;
    case 53: {
      var limit = $pushTemporaryLength(buffer);
      message.documentWithCaptionMessage = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional RequestPhoneNumberMessage requestPhoneNumberMessage = 54;
    case 54: {
      var limit = $pushTemporaryLength(buffer);
      message.requestPhoneNumberMessage = proto.decodeRequestPhoneNumberMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage viewOnceMessageV2 = 55;
    case 55: {
      var limit = $pushTemporaryLength(buffer);
      message.viewOnceMessageV2 = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional EncReactionMessage encReactionMessage = 56;
    case 56: {
      var limit = $pushTemporaryLength(buffer);
      message.encReactionMessage = proto.decodeEncReactionMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage editedMessage = 58;
    case 58: {
      var limit = $pushTemporaryLength(buffer);
      message.editedMessage = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage viewOnceMessageV2Extension = 59;
    case 59: {
      var limit = $pushTemporaryLength(buffer);
      message.viewOnceMessageV2Extension = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PollCreationMessage pollCreationMessageV2 = 60;
    case 60: {
      var limit = $pushTemporaryLength(buffer);
      message.pollCreationMessageV2 = proto.decodePollCreationMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ScheduledCallCreationMessage scheduledCallCreationMessage = 61;
    case 61: {
      var limit = $pushTemporaryLength(buffer);
      message.scheduledCallCreationMessage = proto.decodeScheduledCallCreationMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage groupMentionedMessage = 62;
    case 62: {
      var limit = $pushTemporaryLength(buffer);
      message.groupMentionedMessage = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PinInChatMessage pinInChatMessage = 63;
    case 63: {
      var limit = $pushTemporaryLength(buffer);
      message.pinInChatMessage = proto.decodePinInChatMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PollCreationMessage pollCreationMessageV3 = 64;
    case 64: {
      var limit = $pushTemporaryLength(buffer);
      message.pollCreationMessageV3 = proto.decodePollCreationMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ScheduledCallEditMessage scheduledCallEditMessage = 65;
    case 65: {
      var limit = $pushTemporaryLength(buffer);
      message.scheduledCallEditMessage = proto.decodeScheduledCallEditMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional VideoMessage ptvMessage = 66;
    case 66: {
      var limit = $pushTemporaryLength(buffer);
      message.ptvMessage = proto.decodeVideoMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage botInvokeMessage = 67;
    case 67: {
      var limit = $pushTemporaryLength(buffer);
      message.botInvokeMessage = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional CallLogMessage callLogMesssage = 69;
    case 69: {
      var limit = $pushTemporaryLength(buffer);
      message.callLogMesssage = proto.decodeCallLogMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MessageHistoryBundle messageHistoryBundle = 70;
    case 70: {
      var limit = $pushTemporaryLength(buffer);
      message.messageHistoryBundle = proto.decodeMessageHistoryBundle(buffer);
      buffer.limit = limit;
      break;
    }

    // optional EncCommentMessage encCommentMessage = 71;
    case 71: {
      var limit = $pushTemporaryLength(buffer);
      message.encCommentMessage = proto.decodeEncCommentMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional BCallMessage bcallMessage = 72;
    case 72: {
      var limit = $pushTemporaryLength(buffer);
      message.bcallMessage = proto.decodeBCallMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional FutureProofMessage lottieStickerMessage = 74;
    case 74: {
      var limit = $pushTemporaryLength(buffer);
      message.lottieStickerMessage = proto.decodeFutureProofMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional EventMessage eventMessage = 75;
    case 75: {
      var limit = $pushTemporaryLength(buffer);
      message.eventMessage = proto.decodeEventMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional EncEventResponseMessage encEventResponseMessage = 76;
    case 76: {
      var limit = $pushTemporaryLength(buffer);
      message.encEventResponseMessage = proto.decodeEncEventResponseMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional CommentMessage commentMessage = 77;
    case 77: {
      var limit = $pushTemporaryLength(buffer);
      message.commentMessage = proto.decodeCommentMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional NewsletterAdminInviteMessage newsletterAdminInviteMessage = 78;
    case 78: {
      var limit = $pushTemporaryLength(buffer);
      message.newsletterAdminInviteMessage = proto.decodeNewsletterAdminInviteMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PlaceholderMessage placeholderMessage = 80;
    case 80: {
      var limit = $pushTemporaryLength(buffer);
      message.placeholderMessage = proto.decodePlaceholderMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SecretEncryptedMessage secretEncryptedMessage = 82;
    case 82: {
      var limit = $pushTemporaryLength(buffer);
      message.secretEncryptedMessage = proto.decodeSecretEncryptedMessage(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMessageAddOnContextInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 messageAddOnDurationInSecs = 1;
  var $messageAddOnDurationInSecs = message.messageAddOnDurationInSecs;
  if ($messageAddOnDurationInSecs !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($messageAddOnDurationInSecs);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMessageAddOnContextInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 messageAddOnDurationInSecs = 1;
    case 1: {
      message.messageAddOnDurationInSecs = buffer.readVarint32() >>> 0;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMessageContextInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional DeviceListMetadata deviceListMetadata = 1;
  var $deviceListMetadata = message.deviceListMetadata;
  if ($deviceListMetadata !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeDeviceListMetadata($deviceListMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional int32 deviceListMetadataVersion = 2;
  var $deviceListMetadataVersion = message.deviceListMetadataVersion;
  if ($deviceListMetadataVersion !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($deviceListMetadataVersion | 0);
  }

  // optional bytes messageSecret = 3;
  var $messageSecret = message.messageSecret;
  if ($messageSecret !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($messageSecret.length), buffer.append($messageSecret);
  }

  // optional bytes paddingBytes = 4;
  var $paddingBytes = message.paddingBytes;
  if ($paddingBytes !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($paddingBytes.length), buffer.append($paddingBytes);
  }

  // optional uint32 messageAddOnDurationInSecs = 5;
  var $messageAddOnDurationInSecs = message.messageAddOnDurationInSecs;
  if ($messageAddOnDurationInSecs !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32($messageAddOnDurationInSecs);
  }

  // optional bytes botMessageSecret = 6;
  var $botMessageSecret = message.botMessageSecret;
  if ($botMessageSecret !== undefined) {
    buffer.writeVarint32(50);
    buffer.writeVarint32($botMessageSecret.length), buffer.append($botMessageSecret);
  }

  // optional BotMetadata botMetadata = 7;
  var $botMetadata = message.botMetadata;
  if ($botMetadata !== undefined) {
    buffer.writeVarint32(58);
    var nested = proto.encodeBotMetadata($botMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional int32 reportingTokenVersion = 8;
  var $reportingTokenVersion = message.reportingTokenVersion;
  if ($reportingTokenVersion !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeVarint64($reportingTokenVersion | 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMessageContextInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional DeviceListMetadata deviceListMetadata = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.deviceListMetadata = proto.decodeDeviceListMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    // optional int32 deviceListMetadataVersion = 2;
    case 2: {
      message.deviceListMetadataVersion = buffer.readVarint32();
      break;
    }

    // optional bytes messageSecret = 3;
    case 3: {
      message.messageSecret = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes paddingBytes = 4;
    case 4: {
      message.paddingBytes = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint32 messageAddOnDurationInSecs = 5;
    case 5: {
      message.messageAddOnDurationInSecs = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes botMessageSecret = 6;
    case 6: {
      message.botMessageSecret = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional BotMetadata botMetadata = 7;
    case 7: {
      var limit = $pushTemporaryLength(buffer);
      message.botMetadata = proto.decodeBotMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    // optional int32 reportingTokenVersion = 8;
    case 8: {
      message.reportingTokenVersion = buffer.readVarint32();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMessageKey = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string remoteJid = 1;
  var $remoteJid = message.remoteJid;
  if ($remoteJid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($remoteJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool fromMe = 2;
  var $fromMe = message.fromMe;
  if ($fromMe !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeByte($fromMe ? 1 : 0);
  }

  // optional string id = 3;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($id), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string participant = 4;
  var $participant = message.participant;
  if ($participant !== undefined) {
    buffer.writeVarint32(34);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($participant), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMessageKey = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string remoteJid = 1;
    case 1: {
      message.remoteJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool fromMe = 2;
    case 2: {
      message.fromMe = !!buffer.readByte();
      break;
    }

    // optional string id = 3;
    case 3: {
      message.id = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string participant = 4;
    case 4: {
      message.participant = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMessageSecretMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional sfixed32 version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    buffer.writeVarint32(13);
    buffer.writeInt32($version);
  }

  // optional bytes encIv = 2;
  var $encIv = message.encIv;
  if ($encIv !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($encIv.length), buffer.append($encIv);
  }

  // optional bytes encPayload = 3;
  var $encPayload = message.encPayload;
  if ($encPayload !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($encPayload.length), buffer.append($encPayload);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMessageSecretMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional sfixed32 version = 1;
    case 1: {
      message.version = buffer.readInt32();
      break;
    }

    // optional bytes encIv = 2;
    case 2: {
      message.encIv = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes encPayload = 3;
    case 3: {
      message.encPayload = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMoney = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional int64 value = 1;
  var $value = message.value;
  if ($value !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint64($coerceLong($value));
  }

  // optional uint32 offset = 2;
  var $offset = message.offset;
  if ($offset !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32($offset);
  }

  // optional string currencyCode = 3;
  var $currencyCode = message.currencyCode;
  if ($currencyCode !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($currencyCode), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMoney = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional int64 value = 1;
    case 1: {
      message.value = buffer.readVarint64();
      break;
    }

    // optional uint32 offset = 2;
    case 2: {
      message.offset = buffer.readVarint32() >>> 0;
      break;
    }

    // optional string currencyCode = 3;
    case 3: {
      message.currencyCode = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMsgOpaqueData = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string body = 1;
  var $body = message.body;
  if ($body !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($body), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string caption = 3;
  var $caption = message.caption;
  if ($caption !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($caption), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional double lng = 5;
  var $lng = message.lng;
  if ($lng !== undefined) {
    buffer.writeVarint32(41);
    buffer.writeDouble($lng);
  }

  // optional bool isLive = 6;
  var $isLive = message.isLive;
  if ($isLive !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeByte($isLive ? 1 : 0);
  }

  // optional double lat = 7;
  var $lat = message.lat;
  if ($lat !== undefined) {
    buffer.writeVarint32(57);
    buffer.writeDouble($lat);
  }

  // optional int32 paymentAmount1000 = 8;
  var $paymentAmount1000 = message.paymentAmount1000;
  if ($paymentAmount1000 !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeVarint64($paymentAmount1000 | 0);
  }

  // optional string paymentNoteMsgBody = 9;
  var $paymentNoteMsgBody = message.paymentNoteMsgBody;
  if ($paymentNoteMsgBody !== undefined) {
    buffer.writeVarint32(74);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($paymentNoteMsgBody), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string canonicalUrl = 10;
  var $canonicalUrl = message.canonicalUrl;
  if ($canonicalUrl !== undefined) {
    buffer.writeVarint32(82);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($canonicalUrl), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string matchedText = 11;
  var $matchedText = message.matchedText;
  if ($matchedText !== undefined) {
    buffer.writeVarint32(90);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($matchedText), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string title = 12;
  var $title = message.title;
  if ($title !== undefined) {
    buffer.writeVarint32(98);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($title), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string description = 13;
  var $description = message.description;
  if ($description !== undefined) {
    buffer.writeVarint32(106);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($description), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes futureproofBuffer = 14;
  var $futureproofBuffer = message.futureproofBuffer;
  if ($futureproofBuffer !== undefined) {
    buffer.writeVarint32(114);
    buffer.writeVarint32($futureproofBuffer.length), buffer.append($futureproofBuffer);
  }

  // optional string clientUrl = 15;
  var $clientUrl = message.clientUrl;
  if ($clientUrl !== undefined) {
    buffer.writeVarint32(122);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($clientUrl), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string loc = 16;
  var $loc = message.loc;
  if ($loc !== undefined) {
    buffer.writeVarint32(130);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($loc), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string pollName = 17;
  var $pollName = message.pollName;
  if ($pollName !== undefined) {
    buffer.writeVarint32(138);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pollName), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // repeated PollOption pollOptions = 18;
  var array$pollOptions = message.pollOptions;
  if (array$pollOptions !== undefined) {
    for (var i = 0; i < array$pollOptions.length; i++) {
      var $pollOptions = array$pollOptions[i];
      var nested = proto.encodePollOption($pollOptions);
      buffer.writeVarint32(146);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional uint32 pollSelectableOptionsCount = 20;
  var $pollSelectableOptionsCount = message.pollSelectableOptionsCount;
  if ($pollSelectableOptionsCount !== undefined) {
    buffer.writeVarint32(160);
    buffer.writeVarint32($pollSelectableOptionsCount);
  }

  // optional bytes messageSecret = 21;
  var $messageSecret = message.messageSecret;
  if ($messageSecret !== undefined) {
    buffer.writeVarint32(170);
    buffer.writeVarint32($messageSecret.length), buffer.append($messageSecret);
  }

  // optional string originalSelfAuthor = 51;
  var $originalSelfAuthor = message.originalSelfAuthor;
  if ($originalSelfAuthor !== undefined) {
    buffer.writeVarint32(410);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($originalSelfAuthor), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional int64 senderTimestampMs = 22;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    buffer.writeVarint32(176);
    buffer.writeVarint64($coerceLong($senderTimestampMs));
  }

  // optional string pollUpdateParentKey = 23;
  var $pollUpdateParentKey = message.pollUpdateParentKey;
  if ($pollUpdateParentKey !== undefined) {
    buffer.writeVarint32(186);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pollUpdateParentKey), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional PollEncValue encPollVote = 24;
  var $encPollVote = message.encPollVote;
  if ($encPollVote !== undefined) {
    buffer.writeVarint32(194);
    var nested = proto.encodePollEncValue($encPollVote);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool isSentCagPollCreation = 28;
  var $isSentCagPollCreation = message.isSentCagPollCreation;
  if ($isSentCagPollCreation !== undefined) {
    buffer.writeVarint32(224);
    buffer.writeByte($isSentCagPollCreation ? 1 : 0);
  }

  // optional string encReactionTargetMessageKey = 25;
  var $encReactionTargetMessageKey = message.encReactionTargetMessageKey;
  if ($encReactionTargetMessageKey !== undefined) {
    buffer.writeVarint32(202);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($encReactionTargetMessageKey), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes encReactionEncPayload = 26;
  var $encReactionEncPayload = message.encReactionEncPayload;
  if ($encReactionEncPayload !== undefined) {
    buffer.writeVarint32(210);
    buffer.writeVarint32($encReactionEncPayload.length), buffer.append($encReactionEncPayload);
  }

  // optional bytes encReactionEncIv = 27;
  var $encReactionEncIv = message.encReactionEncIv;
  if ($encReactionEncIv !== undefined) {
    buffer.writeVarint32(218);
    buffer.writeVarint32($encReactionEncIv.length), buffer.append($encReactionEncIv);
  }

  // optional bytes botMessageSecret = 29;
  var $botMessageSecret = message.botMessageSecret;
  if ($botMessageSecret !== undefined) {
    buffer.writeVarint32(234);
    buffer.writeVarint32($botMessageSecret.length), buffer.append($botMessageSecret);
  }

  // optional string targetMessageKey = 30;
  var $targetMessageKey = message.targetMessageKey;
  if ($targetMessageKey !== undefined) {
    buffer.writeVarint32(242);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($targetMessageKey), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes encPayload = 31;
  var $encPayload = message.encPayload;
  if ($encPayload !== undefined) {
    buffer.writeVarint32(250);
    buffer.writeVarint32($encPayload.length), buffer.append($encPayload);
  }

  // optional bytes encIv = 32;
  var $encIv = message.encIv;
  if ($encIv !== undefined) {
    buffer.writeVarint32(258);
    buffer.writeVarint32($encIv.length), buffer.append($encIv);
  }

  // optional string eventName = 33;
  var $eventName = message.eventName;
  if ($eventName !== undefined) {
    buffer.writeVarint32(266);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($eventName), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool isEventCanceled = 34;
  var $isEventCanceled = message.isEventCanceled;
  if ($isEventCanceled !== undefined) {
    buffer.writeVarint32(272);
    buffer.writeByte($isEventCanceled ? 1 : 0);
  }

  // optional string eventDescription = 35;
  var $eventDescription = message.eventDescription;
  if ($eventDescription !== undefined) {
    buffer.writeVarint32(282);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($eventDescription), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string eventJoinLink = 36;
  var $eventJoinLink = message.eventJoinLink;
  if ($eventJoinLink !== undefined) {
    buffer.writeVarint32(290);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($eventJoinLink), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional int64 eventStartTime = 37;
  var $eventStartTime = message.eventStartTime;
  if ($eventStartTime !== undefined) {
    buffer.writeVarint32(296);
    buffer.writeVarint64($coerceLong($eventStartTime));
  }

  // optional EventLocation eventLocation = 38;
  var $eventLocation = message.eventLocation;
  if ($eventLocation !== undefined) {
    buffer.writeVarint32(306);
    var nested = proto.encodeEventLocation($eventLocation);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMsgOpaqueData = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string body = 1;
    case 1: {
      message.body = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string caption = 3;
    case 3: {
      message.caption = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional double lng = 5;
    case 5: {
      message.lng = buffer.readDouble();
      break;
    }

    // optional bool isLive = 6;
    case 6: {
      message.isLive = !!buffer.readByte();
      break;
    }

    // optional double lat = 7;
    case 7: {
      message.lat = buffer.readDouble();
      break;
    }

    // optional int32 paymentAmount1000 = 8;
    case 8: {
      message.paymentAmount1000 = buffer.readVarint32();
      break;
    }

    // optional string paymentNoteMsgBody = 9;
    case 9: {
      message.paymentNoteMsgBody = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string canonicalUrl = 10;
    case 10: {
      message.canonicalUrl = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string matchedText = 11;
    case 11: {
      message.matchedText = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string title = 12;
    case 12: {
      message.title = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string description = 13;
    case 13: {
      message.description = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes futureproofBuffer = 14;
    case 14: {
      message.futureproofBuffer = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string clientUrl = 15;
    case 15: {
      message.clientUrl = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string loc = 16;
    case 16: {
      message.loc = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string pollName = 17;
    case 17: {
      message.pollName = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // repeated PollOption pollOptions = 18;
    case 18: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.pollOptions || (message.pollOptions = []);
      values.push(proto.decodePollOption(buffer));
      buffer.limit = limit;
      break;
    }

    // optional uint32 pollSelectableOptionsCount = 20;
    case 20: {
      message.pollSelectableOptionsCount = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes messageSecret = 21;
    case 21: {
      message.messageSecret = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string originalSelfAuthor = 51;
    case 51: {
      message.originalSelfAuthor = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional int64 senderTimestampMs = 22;
    case 22: {
      message.senderTimestampMs = buffer.readVarint64();
      break;
    }

    // optional string pollUpdateParentKey = 23;
    case 23: {
      message.pollUpdateParentKey = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional PollEncValue encPollVote = 24;
    case 24: {
      var limit = $pushTemporaryLength(buffer);
      message.encPollVote = proto.decodePollEncValue(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool isSentCagPollCreation = 28;
    case 28: {
      message.isSentCagPollCreation = !!buffer.readByte();
      break;
    }

    // optional string encReactionTargetMessageKey = 25;
    case 25: {
      message.encReactionTargetMessageKey = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes encReactionEncPayload = 26;
    case 26: {
      message.encReactionEncPayload = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes encReactionEncIv = 27;
    case 27: {
      message.encReactionEncIv = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes botMessageSecret = 29;
    case 29: {
      message.botMessageSecret = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string targetMessageKey = 30;
    case 30: {
      message.targetMessageKey = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes encPayload = 31;
    case 31: {
      message.encPayload = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes encIv = 32;
    case 32: {
      message.encIv = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string eventName = 33;
    case 33: {
      message.eventName = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool isEventCanceled = 34;
    case 34: {
      message.isEventCanceled = !!buffer.readByte();
      break;
    }

    // optional string eventDescription = 35;
    case 35: {
      message.eventDescription = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string eventJoinLink = 36;
    case 36: {
      message.eventJoinLink = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional int64 eventStartTime = 37;
    case 37: {
      message.eventStartTime = buffer.readVarint64();
      break;
    }

    // optional EventLocation eventLocation = 38;
    case 38: {
      var limit = $pushTemporaryLength(buffer);
      message.eventLocation = proto.decodeEventLocation(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeMsgRowOpaqueData = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional MsgOpaqueData currentMsg = 1;
  var $currentMsg = message.currentMsg;
  if ($currentMsg !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeMsgOpaqueData($currentMsg);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MsgOpaqueData quotedMsg = 2;
  var $quotedMsg = message.quotedMsg;
  if ($quotedMsg !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeMsgOpaqueData($quotedMsg);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeMsgRowOpaqueData = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional MsgOpaqueData currentMsg = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.currentMsg = proto.decodeMsgOpaqueData(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MsgOpaqueData quotedMsg = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.quotedMsg = proto.decodeMsgOpaqueData(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeNoiseCertificate = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($details.length), buffer.append($details);
  }

  // optional bytes signature = 2;
  var $signature = message.signature;
  if ($signature !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($signature.length), buffer.append($signature);
  }

  return buffer.flip().toBuffer();
};

proto.decodeNoiseCertificate = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes details = 1;
    case 1: {
      message.details = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes signature = 2;
    case 2: {
      message.signature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeNotificationMessageInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional MessageKey key = 1;
  var $key = message.key;
  if ($key !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeMessageKey($key);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Message message = 2;
  var $message = message.message;
  if ($message !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeMessage($message);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 messageTimestamp = 3;
  var $messageTimestamp = message.messageTimestamp;
  if ($messageTimestamp !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($messageTimestamp));
  }

  // optional string participant = 4;
  var $participant = message.participant;
  if ($participant !== undefined) {
    buffer.writeVarint32(34);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($participant), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeNotificationMessageInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional MessageKey key = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.key = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Message message = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.message = proto.decodeMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 messageTimestamp = 3;
    case 3: {
      message.messageTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional string participant = 4;
    case 4: {
      message.participant = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeNotificationSettings = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string messageVibrate = 1;
  var $messageVibrate = message.messageVibrate;
  if ($messageVibrate !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($messageVibrate), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string messagePopup = 2;
  var $messagePopup = message.messagePopup;
  if ($messagePopup !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($messagePopup), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string messageLight = 3;
  var $messageLight = message.messageLight;
  if ($messageLight !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($messageLight), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool lowPriorityNotifications = 4;
  var $lowPriorityNotifications = message.lowPriorityNotifications;
  if ($lowPriorityNotifications !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeByte($lowPriorityNotifications ? 1 : 0);
  }

  // optional bool reactionsMuted = 5;
  var $reactionsMuted = message.reactionsMuted;
  if ($reactionsMuted !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeByte($reactionsMuted ? 1 : 0);
  }

  // optional string callVibrate = 6;
  var $callVibrate = message.callVibrate;
  if ($callVibrate !== undefined) {
    buffer.writeVarint32(50);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($callVibrate), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeNotificationSettings = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string messageVibrate = 1;
    case 1: {
      message.messageVibrate = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string messagePopup = 2;
    case 2: {
      message.messagePopup = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string messageLight = 3;
    case 3: {
      message.messageLight = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool lowPriorityNotifications = 4;
    case 4: {
      message.lowPriorityNotifications = !!buffer.readByte();
      break;
    }

    // optional bool reactionsMuted = 5;
    case 5: {
      message.reactionsMuted = !!buffer.readByte();
      break;
    }

    // optional string callVibrate = 6;
    case 6: {
      message.callVibrate = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePastParticipant = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string userJid = 1;
  var $userJid = message.userJid;
  if ($userJid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($userJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional LeaveReason leaveReason = 2;
  var $leaveReason = message.leaveReason;
  if ($leaveReason !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeLeaveReason($leaveReason);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 leaveTs = 3;
  var $leaveTs = message.leaveTs;
  if ($leaveTs !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($leaveTs));
  }

  return buffer.flip().toBuffer();
};

proto.decodePastParticipant = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string userJid = 1;
    case 1: {
      message.userJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional LeaveReason leaveReason = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.leaveReason = proto.decodeLeaveReason(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 leaveTs = 3;
    case 3: {
      message.leaveTs = buffer.readVarint64().toUnsigned();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePastParticipants = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string groupJid = 1;
  var $groupJid = message.groupJid;
  if ($groupJid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($groupJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // repeated PastParticipant pastParticipants = 2;
  var array$pastParticipants = message.pastParticipants;
  if (array$pastParticipants !== undefined) {
    for (var i = 0; i < array$pastParticipants.length; i++) {
      var $pastParticipants = array$pastParticipants[i];
      var nested = proto.encodePastParticipant($pastParticipants);
      buffer.writeVarint32(18);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodePastParticipants = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string groupJid = 1;
    case 1: {
      message.groupJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // repeated PastParticipant pastParticipants = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.pastParticipants || (message.pastParticipants = []);
      values.push(proto.decodePastParticipant(buffer));
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePatchDebugData = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes currentLthash = 1;
  var $currentLthash = message.currentLthash;
  if ($currentLthash !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($currentLthash.length), buffer.append($currentLthash);
  }

  // optional bytes newLthash = 2;
  var $newLthash = message.newLthash;
  if ($newLthash !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($newLthash.length), buffer.append($newLthash);
  }

  // optional bytes patchVersion = 3;
  var $patchVersion = message.patchVersion;
  if ($patchVersion !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($patchVersion.length), buffer.append($patchVersion);
  }

  // optional bytes collectionName = 4;
  var $collectionName = message.collectionName;
  if ($collectionName !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($collectionName.length), buffer.append($collectionName);
  }

  // optional bytes firstFourBytesFromAHashOfSnapshotMacKey = 5;
  var $firstFourBytesFromAHashOfSnapshotMacKey = message.firstFourBytesFromAHashOfSnapshotMacKey;
  if ($firstFourBytesFromAHashOfSnapshotMacKey !== undefined) {
    buffer.writeVarint32(42);
    buffer.writeVarint32($firstFourBytesFromAHashOfSnapshotMacKey.length), buffer.append($firstFourBytesFromAHashOfSnapshotMacKey);
  }

  // optional bytes newLthashSubtract = 6;
  var $newLthashSubtract = message.newLthashSubtract;
  if ($newLthashSubtract !== undefined) {
    buffer.writeVarint32(50);
    buffer.writeVarint32($newLthashSubtract.length), buffer.append($newLthashSubtract);
  }

  // optional int32 numberAdd = 7;
  var $numberAdd = message.numberAdd;
  if ($numberAdd !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeVarint64($numberAdd | 0);
  }

  // optional int32 numberRemove = 8;
  var $numberRemove = message.numberRemove;
  if ($numberRemove !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeVarint64($numberRemove | 0);
  }

  // optional int32 numberOverride = 9;
  var $numberOverride = message.numberOverride;
  if ($numberOverride !== undefined) {
    buffer.writeVarint32(72);
    buffer.writeVarint64($numberOverride | 0);
  }

  // optional Platform senderPlatform = 10;
  var $senderPlatform = message.senderPlatform;
  if ($senderPlatform !== undefined) {
    buffer.writeVarint32(82);
    var nested = proto.encodePlatform($senderPlatform);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool isSenderPrimary = 11;
  var $isSenderPrimary = message.isSenderPrimary;
  if ($isSenderPrimary !== undefined) {
    buffer.writeVarint32(88);
    buffer.writeByte($isSenderPrimary ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodePatchDebugData = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes currentLthash = 1;
    case 1: {
      message.currentLthash = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes newLthash = 2;
    case 2: {
      message.newLthash = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes patchVersion = 3;
    case 3: {
      message.patchVersion = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes collectionName = 4;
    case 4: {
      message.collectionName = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes firstFourBytesFromAHashOfSnapshotMacKey = 5;
    case 5: {
      message.firstFourBytesFromAHashOfSnapshotMacKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes newLthashSubtract = 6;
    case 6: {
      message.newLthashSubtract = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional int32 numberAdd = 7;
    case 7: {
      message.numberAdd = buffer.readVarint32();
      break;
    }

    // optional int32 numberRemove = 8;
    case 8: {
      message.numberRemove = buffer.readVarint32();
      break;
    }

    // optional int32 numberOverride = 9;
    case 9: {
      message.numberOverride = buffer.readVarint32();
      break;
    }

    // optional Platform senderPlatform = 10;
    case 10: {
      var limit = $pushTemporaryLength(buffer);
      message.senderPlatform = proto.decodePlatform(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool isSenderPrimary = 11;
    case 11: {
      message.isSenderPrimary = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePaymentBackground = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($id), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint64 fileLength = 2;
  var $fileLength = message.fileLength;
  if ($fileLength !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($fileLength));
  }

  // optional uint32 width = 3;
  var $width = message.width;
  if ($width !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32($width);
  }

  // optional uint32 height = 4;
  var $height = message.height;
  if ($height !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint32($height);
  }

  // optional string mimetype = 5;
  var $mimetype = message.mimetype;
  if ($mimetype !== undefined) {
    buffer.writeVarint32(42);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($mimetype), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional fixed32 placeholderArgb = 6;
  var $placeholderArgb = message.placeholderArgb;
  if ($placeholderArgb !== undefined) {
    buffer.writeVarint32(53);
    buffer.writeUint32($placeholderArgb);
  }

  // optional fixed32 textArgb = 7;
  var $textArgb = message.textArgb;
  if ($textArgb !== undefined) {
    buffer.writeVarint32(61);
    buffer.writeUint32($textArgb);
  }

  // optional fixed32 subtextArgb = 8;
  var $subtextArgb = message.subtextArgb;
  if ($subtextArgb !== undefined) {
    buffer.writeVarint32(69);
    buffer.writeUint32($subtextArgb);
  }

  // optional MediaData mediaData = 9;
  var $mediaData = message.mediaData;
  if ($mediaData !== undefined) {
    buffer.writeVarint32(74);
    var nested = proto.encodeMediaData($mediaData);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Type type = 10;
  var $type = message.type;
  if ($type !== undefined) {
    buffer.writeVarint32(82);
    var nested = proto.encodeType($type);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodePaymentBackground = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string id = 1;
    case 1: {
      message.id = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint64 fileLength = 2;
    case 2: {
      message.fileLength = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint32 width = 3;
    case 3: {
      message.width = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 height = 4;
    case 4: {
      message.height = buffer.readVarint32() >>> 0;
      break;
    }

    // optional string mimetype = 5;
    case 5: {
      message.mimetype = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional fixed32 placeholderArgb = 6;
    case 6: {
      message.placeholderArgb = buffer.readUint32();
      break;
    }

    // optional fixed32 textArgb = 7;
    case 7: {
      message.textArgb = buffer.readUint32();
      break;
    }

    // optional fixed32 subtextArgb = 8;
    case 8: {
      message.subtextArgb = buffer.readUint32();
      break;
    }

    // optional MediaData mediaData = 9;
    case 9: {
      var limit = $pushTemporaryLength(buffer);
      message.mediaData = proto.decodeMediaData(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Type type = 10;
    case 10: {
      var limit = $pushTemporaryLength(buffer);
      message.type = proto.decodeType(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePaymentInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional Currency currencyDeprecated = 1;
  var $currencyDeprecated = message.currencyDeprecated;
  if ($currencyDeprecated !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeCurrency($currencyDeprecated);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 amount1000 = 2;
  var $amount1000 = message.amount1000;
  if ($amount1000 !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($amount1000));
  }

  // optional string receiverJid = 3;
  var $receiverJid = message.receiverJid;
  if ($receiverJid !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($receiverJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional Status status = 4;
  var $status = message.status;
  if ($status !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeStatus($status);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 transactionTimestamp = 5;
  var $transactionTimestamp = message.transactionTimestamp;
  if ($transactionTimestamp !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint64($coerceLong($transactionTimestamp));
  }

  // optional MessageKey requestMessageKey = 6;
  var $requestMessageKey = message.requestMessageKey;
  if ($requestMessageKey !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeMessageKey($requestMessageKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 expiryTimestamp = 7;
  var $expiryTimestamp = message.expiryTimestamp;
  if ($expiryTimestamp !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeVarint64($coerceLong($expiryTimestamp));
  }

  // optional bool futureproofed = 8;
  var $futureproofed = message.futureproofed;
  if ($futureproofed !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeByte($futureproofed ? 1 : 0);
  }

  // optional string currency = 9;
  var $currency = message.currency;
  if ($currency !== undefined) {
    buffer.writeVarint32(74);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($currency), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional TxnStatus txnStatus = 10;
  var $txnStatus = message.txnStatus;
  if ($txnStatus !== undefined) {
    buffer.writeVarint32(82);
    var nested = proto.encodeTxnStatus($txnStatus);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool useNoviFiatFormat = 11;
  var $useNoviFiatFormat = message.useNoviFiatFormat;
  if ($useNoviFiatFormat !== undefined) {
    buffer.writeVarint32(88);
    buffer.writeByte($useNoviFiatFormat ? 1 : 0);
  }

  // optional Money primaryAmount = 12;
  var $primaryAmount = message.primaryAmount;
  if ($primaryAmount !== undefined) {
    buffer.writeVarint32(98);
    var nested = proto.encodeMoney($primaryAmount);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Money exchangeAmount = 13;
  var $exchangeAmount = message.exchangeAmount;
  if ($exchangeAmount !== undefined) {
    buffer.writeVarint32(106);
    var nested = proto.encodeMoney($exchangeAmount);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodePaymentInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional Currency currencyDeprecated = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.currencyDeprecated = proto.decodeCurrency(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 amount1000 = 2;
    case 2: {
      message.amount1000 = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional string receiverJid = 3;
    case 3: {
      message.receiverJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional Status status = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.status = proto.decodeStatus(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 transactionTimestamp = 5;
    case 5: {
      message.transactionTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional MessageKey requestMessageKey = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.requestMessageKey = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 expiryTimestamp = 7;
    case 7: {
      message.expiryTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional bool futureproofed = 8;
    case 8: {
      message.futureproofed = !!buffer.readByte();
      break;
    }

    // optional string currency = 9;
    case 9: {
      message.currency = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional TxnStatus txnStatus = 10;
    case 10: {
      var limit = $pushTemporaryLength(buffer);
      message.txnStatus = proto.decodeTxnStatus(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool useNoviFiatFormat = 11;
    case 11: {
      message.useNoviFiatFormat = !!buffer.readByte();
      break;
    }

    // optional Money primaryAmount = 12;
    case 12: {
      var limit = $pushTemporaryLength(buffer);
      message.primaryAmount = proto.decodeMoney(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Money exchangeAmount = 13;
    case 13: {
      var limit = $pushTemporaryLength(buffer);
      message.exchangeAmount = proto.decodeMoney(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePhoneNumberToLIDMapping = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string pnJid = 1;
  var $pnJid = message.pnJid;
  if ($pnJid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pnJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string lidJid = 2;
  var $lidJid = message.lidJid;
  if ($lidJid !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($lidJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodePhoneNumberToLIDMapping = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string pnJid = 1;
    case 1: {
      message.pnJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string lidJid = 2;
    case 2: {
      message.lidJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePhotoChange = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes oldPhoto = 1;
  var $oldPhoto = message.oldPhoto;
  if ($oldPhoto !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($oldPhoto.length), buffer.append($oldPhoto);
  }

  // optional bytes newPhoto = 2;
  var $newPhoto = message.newPhoto;
  if ($newPhoto !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($newPhoto.length), buffer.append($newPhoto);
  }

  // optional uint32 newPhotoId = 3;
  var $newPhotoId = message.newPhotoId;
  if ($newPhotoId !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32($newPhotoId);
  }

  return buffer.flip().toBuffer();
};

proto.decodePhotoChange = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes oldPhoto = 1;
    case 1: {
      message.oldPhoto = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes newPhoto = 2;
    case 2: {
      message.newPhoto = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint32 newPhotoId = 3;
    case 3: {
      message.newPhotoId = buffer.readVarint32() >>> 0;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePinInChat = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional Type type = 1;
  var $type = message.type;
  if ($type !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeType($type);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MessageKey key = 2;
  var $key = message.key;
  if ($key !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeMessageKey($key);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional int64 senderTimestampMs = 3;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($senderTimestampMs));
  }

  // optional int64 serverTimestampMs = 4;
  var $serverTimestampMs = message.serverTimestampMs;
  if ($serverTimestampMs !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint64($coerceLong($serverTimestampMs));
  }

  // optional MessageAddOnContextInfo messageAddOnContextInfo = 5;
  var $messageAddOnContextInfo = message.messageAddOnContextInfo;
  if ($messageAddOnContextInfo !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeMessageAddOnContextInfo($messageAddOnContextInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodePinInChat = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional Type type = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.type = proto.decodeType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MessageKey key = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.key = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional int64 senderTimestampMs = 3;
    case 3: {
      message.senderTimestampMs = buffer.readVarint64();
      break;
    }

    // optional int64 serverTimestampMs = 4;
    case 4: {
      message.serverTimestampMs = buffer.readVarint64();
      break;
    }

    // optional MessageAddOnContextInfo messageAddOnContextInfo = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.messageAddOnContextInfo = proto.decodeMessageAddOnContextInfo(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePoint = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional int32 xDeprecated = 1;
  var $xDeprecated = message.xDeprecated;
  if ($xDeprecated !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint64($xDeprecated | 0);
  }

  // optional int32 yDeprecated = 2;
  var $yDeprecated = message.yDeprecated;
  if ($yDeprecated !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($yDeprecated | 0);
  }

  // optional double x = 3;
  var $x = message.x;
  if ($x !== undefined) {
    buffer.writeVarint32(25);
    buffer.writeDouble($x);
  }

  // optional double y = 4;
  var $y = message.y;
  if ($y !== undefined) {
    buffer.writeVarint32(33);
    buffer.writeDouble($y);
  }

  return buffer.flip().toBuffer();
};

proto.decodePoint = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional int32 xDeprecated = 1;
    case 1: {
      message.xDeprecated = buffer.readVarint32();
      break;
    }

    // optional int32 yDeprecated = 2;
    case 2: {
      message.yDeprecated = buffer.readVarint32();
      break;
    }

    // optional double x = 3;
    case 3: {
      message.x = buffer.readDouble();
      break;
    }

    // optional double y = 4;
    case 4: {
      message.y = buffer.readDouble();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePollAdditionalMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bool pollInvalidated = 1;
  var $pollInvalidated = message.pollInvalidated;
  if ($pollInvalidated !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeByte($pollInvalidated ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodePollAdditionalMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bool pollInvalidated = 1;
    case 1: {
      message.pollInvalidated = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePollEncValue = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes encPayload = 1;
  var $encPayload = message.encPayload;
  if ($encPayload !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($encPayload.length), buffer.append($encPayload);
  }

  // optional bytes encIv = 2;
  var $encIv = message.encIv;
  if ($encIv !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($encIv.length), buffer.append($encIv);
  }

  return buffer.flip().toBuffer();
};

proto.decodePollEncValue = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes encPayload = 1;
    case 1: {
      message.encPayload = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes encIv = 2;
    case 2: {
      message.encIv = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePollUpdate = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional MessageKey pollUpdateMessageKey = 1;
  var $pollUpdateMessageKey = message.pollUpdateMessageKey;
  if ($pollUpdateMessageKey !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeMessageKey($pollUpdateMessageKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Message.PollVoteMessage vote = 2;
  var $vote = message.vote;
  if ($vote !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeMessage.PollVoteMessage($vote);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional int64 senderTimestampMs = 3;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($senderTimestampMs));
  }

  // optional int64 serverTimestampMs = 4;
  var $serverTimestampMs = message.serverTimestampMs;
  if ($serverTimestampMs !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint64($coerceLong($serverTimestampMs));
  }

  // optional bool unread = 5;
  var $unread = message.unread;
  if ($unread !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeByte($unread ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodePollUpdate = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional MessageKey pollUpdateMessageKey = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.pollUpdateMessageKey = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Message.PollVoteMessage vote = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.vote = proto.decodeMessage.PollVoteMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional int64 senderTimestampMs = 3;
    case 3: {
      message.senderTimestampMs = buffer.readVarint64();
      break;
    }

    // optional int64 serverTimestampMs = 4;
    case 4: {
      message.serverTimestampMs = buffer.readVarint64();
      break;
    }

    // optional bool unread = 5;
    case 5: {
      message.unread = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePreKeyRecordStructure = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($id);
  }

  // optional bytes publicKey = 2;
  var $publicKey = message.publicKey;
  if ($publicKey !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($publicKey.length), buffer.append($publicKey);
  }

  // optional bytes privateKey = 3;
  var $privateKey = message.privateKey;
  if ($privateKey !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($privateKey.length), buffer.append($privateKey);
  }

  return buffer.flip().toBuffer();
};

proto.decodePreKeyRecordStructure = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 id = 1;
    case 1: {
      message.id = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes publicKey = 2;
    case 2: {
      message.publicKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes privateKey = 3;
    case 3: {
      message.privateKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePreKeySignalMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 registrationId = 5;
  var $registrationId = message.registrationId;
  if ($registrationId !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32($registrationId);
  }

  // optional uint32 preKeyId = 1;
  var $preKeyId = message.preKeyId;
  if ($preKeyId !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($preKeyId);
  }

  // optional uint32 signedPreKeyId = 6;
  var $signedPreKeyId = message.signedPreKeyId;
  if ($signedPreKeyId !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeVarint32($signedPreKeyId);
  }

  // optional bytes baseKey = 2;
  var $baseKey = message.baseKey;
  if ($baseKey !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($baseKey.length), buffer.append($baseKey);
  }

  // optional bytes identityKey = 3;
  var $identityKey = message.identityKey;
  if ($identityKey !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($identityKey.length), buffer.append($identityKey);
  }

  // optional bytes message = 4;
  var $message = message.message;
  if ($message !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($message.length), buffer.append($message);
  }

  return buffer.flip().toBuffer();
};

proto.decodePreKeySignalMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 registrationId = 5;
    case 5: {
      message.registrationId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 preKeyId = 1;
    case 1: {
      message.preKeyId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 signedPreKeyId = 6;
    case 6: {
      message.signedPreKeyId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes baseKey = 2;
    case 2: {
      message.baseKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes identityKey = 3;
    case 3: {
      message.identityKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes message = 4;
    case 4: {
      message.message = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePremiumMessageInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string serverCampaignId = 1;
  var $serverCampaignId = message.serverCampaignId;
  if ($serverCampaignId !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($serverCampaignId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodePremiumMessageInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string serverCampaignId = 1;
    case 1: {
      message.serverCampaignId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodePushname = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($id), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string pushname = 2;
  var $pushname = message.pushname;
  if ($pushname !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pushname), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodePushname = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string id = 1;
    case 1: {
      message.id = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string pushname = 2;
    case 2: {
      message.pushname = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeQP = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  return buffer.flip().toBuffer();
};

proto.decodeQP = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeReaction = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional MessageKey key = 1;
  var $key = message.key;
  if ($key !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeMessageKey($key);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string text = 2;
  var $text = message.text;
  if ($text !== undefined) {
    buffer.writeVarint32(18);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($text), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional string groupingKey = 3;
  var $groupingKey = message.groupingKey;
  if ($groupingKey !== undefined) {
    buffer.writeVarint32(26);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($groupingKey), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional int64 senderTimestampMs = 4;
  var $senderTimestampMs = message.senderTimestampMs;
  if ($senderTimestampMs !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint64($coerceLong($senderTimestampMs));
  }

  // optional bool unread = 5;
  var $unread = message.unread;
  if ($unread !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeByte($unread ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeReaction = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional MessageKey key = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.key = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string text = 2;
    case 2: {
      message.text = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional string groupingKey = 3;
    case 3: {
      message.groupingKey = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional int64 senderTimestampMs = 4;
    case 4: {
      message.senderTimestampMs = buffer.readVarint64();
      break;
    }

    // optional bool unread = 5;
    case 5: {
      message.unread = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeRecentEmojiWeight = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string emoji = 1;
  var $emoji = message.emoji;
  if ($emoji !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($emoji), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional float weight = 2;
  var $weight = message.weight;
  if ($weight !== undefined) {
    buffer.writeVarint32(21);
    buffer.writeFloat($weight);
  }

  return buffer.flip().toBuffer();
};

proto.decodeRecentEmojiWeight = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string emoji = 1;
    case 1: {
      message.emoji = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional float weight = 2;
    case 2: {
      message.weight = buffer.readFloat();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeRecordStructure = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional SessionStructure currentSession = 1;
  var $currentSession = message.currentSession;
  if ($currentSession !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeSessionStructure($currentSession);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated SessionStructure previousSessions = 2;
  var array$previousSessions = message.previousSessions;
  if (array$previousSessions !== undefined) {
    for (var i = 0; i < array$previousSessions.length; i++) {
      var $previousSessions = array$previousSessions[i];
      var nested = proto.encodeSessionStructure($previousSessions);
      buffer.writeVarint32(18);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodeRecordStructure = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional SessionStructure currentSession = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.currentSession = proto.decodeSessionStructure(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated SessionStructure previousSessions = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.previousSessions || (message.previousSessions = []);
      values.push(proto.decodeSessionStructure(buffer));
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeReportingTokenInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes reportingTag = 1;
  var $reportingTag = message.reportingTag;
  if ($reportingTag !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($reportingTag.length), buffer.append($reportingTag);
  }

  return buffer.flip().toBuffer();
};

proto.decodeReportingTokenInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes reportingTag = 1;
    case 1: {
      message.reportingTag = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSenderKeyDistributionMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($id);
  }

  // optional uint32 iteration = 2;
  var $iteration = message.iteration;
  if ($iteration !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32($iteration);
  }

  // optional bytes chainKey = 3;
  var $chainKey = message.chainKey;
  if ($chainKey !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($chainKey.length), buffer.append($chainKey);
  }

  // optional bytes signingKey = 4;
  var $signingKey = message.signingKey;
  if ($signingKey !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($signingKey.length), buffer.append($signingKey);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSenderKeyDistributionMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 id = 1;
    case 1: {
      message.id = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 iteration = 2;
    case 2: {
      message.iteration = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes chainKey = 3;
    case 3: {
      message.chainKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes signingKey = 4;
    case 4: {
      message.signingKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSenderKeyMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($id);
  }

  // optional uint32 iteration = 2;
  var $iteration = message.iteration;
  if ($iteration !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32($iteration);
  }

  // optional bytes ciphertext = 3;
  var $ciphertext = message.ciphertext;
  if ($ciphertext !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($ciphertext.length), buffer.append($ciphertext);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSenderKeyMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 id = 1;
    case 1: {
      message.id = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 iteration = 2;
    case 2: {
      message.iteration = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes ciphertext = 3;
    case 3: {
      message.ciphertext = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSenderKeyRecordStructure = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // repeated SenderKeyStateStructure senderKeyStates = 1;
  var array$senderKeyStates = message.senderKeyStates;
  if (array$senderKeyStates !== undefined) {
    for (var i = 0; i < array$senderKeyStates.length; i++) {
      var $senderKeyStates = array$senderKeyStates[i];
      var nested = proto.encodeSenderKeyStateStructure($senderKeyStates);
      buffer.writeVarint32(10);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodeSenderKeyRecordStructure = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // repeated SenderKeyStateStructure senderKeyStates = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.senderKeyStates || (message.senderKeyStates = []);
      values.push(proto.decodeSenderKeyStateStructure(buffer));
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSenderKeyStateStructure = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 senderKeyId = 1;
  var $senderKeyId = message.senderKeyId;
  if ($senderKeyId !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($senderKeyId);
  }

  // optional SenderChainKey senderChainKey = 2;
  var $senderChainKey = message.senderChainKey;
  if ($senderChainKey !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeSenderChainKey($senderChainKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SenderSigningKey senderSigningKey = 3;
  var $senderSigningKey = message.senderSigningKey;
  if ($senderSigningKey !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeSenderSigningKey($senderSigningKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated SenderMessageKey senderMessageKeys = 4;
  var array$senderMessageKeys = message.senderMessageKeys;
  if (array$senderMessageKeys !== undefined) {
    for (var i = 0; i < array$senderMessageKeys.length; i++) {
      var $senderMessageKeys = array$senderMessageKeys[i];
      var nested = proto.encodeSenderMessageKey($senderMessageKeys);
      buffer.writeVarint32(34);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodeSenderKeyStateStructure = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 senderKeyId = 1;
    case 1: {
      message.senderKeyId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional SenderChainKey senderChainKey = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.senderChainKey = proto.decodeSenderChainKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SenderSigningKey senderSigningKey = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.senderSigningKey = proto.decodeSenderSigningKey(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated SenderMessageKey senderMessageKeys = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.senderMessageKeys || (message.senderMessageKeys = []);
      values.push(proto.decodeSenderMessageKey(buffer));
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeServerErrorReceipt = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string stanzaId = 1;
  var $stanzaId = message.stanzaId;
  if ($stanzaId !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($stanzaId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeServerErrorReceipt = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string stanzaId = 1;
    case 1: {
      message.stanzaId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSessionStructure = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 sessionVersion = 1;
  var $sessionVersion = message.sessionVersion;
  if ($sessionVersion !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($sessionVersion);
  }

  // optional bytes localIdentityPublic = 2;
  var $localIdentityPublic = message.localIdentityPublic;
  if ($localIdentityPublic !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($localIdentityPublic.length), buffer.append($localIdentityPublic);
  }

  // optional bytes remoteIdentityPublic = 3;
  var $remoteIdentityPublic = message.remoteIdentityPublic;
  if ($remoteIdentityPublic !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($remoteIdentityPublic.length), buffer.append($remoteIdentityPublic);
  }

  // optional bytes rootKey = 4;
  var $rootKey = message.rootKey;
  if ($rootKey !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($rootKey.length), buffer.append($rootKey);
  }

  // optional uint32 previousCounter = 5;
  var $previousCounter = message.previousCounter;
  if ($previousCounter !== undefined) {
    buffer.writeVarint32(40);
    buffer.writeVarint32($previousCounter);
  }

  // optional Chain senderChain = 6;
  var $senderChain = message.senderChain;
  if ($senderChain !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeChain($senderChain);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated Chain receiverChains = 7;
  var array$receiverChains = message.receiverChains;
  if (array$receiverChains !== undefined) {
    for (var i = 0; i < array$receiverChains.length; i++) {
      var $receiverChains = array$receiverChains[i];
      var nested = proto.encodeChain($receiverChains);
      buffer.writeVarint32(58);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional PendingKeyExchange pendingKeyExchange = 8;
  var $pendingKeyExchange = message.pendingKeyExchange;
  if ($pendingKeyExchange !== undefined) {
    buffer.writeVarint32(66);
    var nested = proto.encodePendingKeyExchange($pendingKeyExchange);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PendingPreKey pendingPreKey = 9;
  var $pendingPreKey = message.pendingPreKey;
  if ($pendingPreKey !== undefined) {
    buffer.writeVarint32(74);
    var nested = proto.encodePendingPreKey($pendingPreKey);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint32 remoteRegistrationId = 10;
  var $remoteRegistrationId = message.remoteRegistrationId;
  if ($remoteRegistrationId !== undefined) {
    buffer.writeVarint32(80);
    buffer.writeVarint32($remoteRegistrationId);
  }

  // optional uint32 localRegistrationId = 11;
  var $localRegistrationId = message.localRegistrationId;
  if ($localRegistrationId !== undefined) {
    buffer.writeVarint32(88);
    buffer.writeVarint32($localRegistrationId);
  }

  // optional bool needsRefresh = 12;
  var $needsRefresh = message.needsRefresh;
  if ($needsRefresh !== undefined) {
    buffer.writeVarint32(96);
    buffer.writeByte($needsRefresh ? 1 : 0);
  }

  // optional bytes aliceBaseKey = 13;
  var $aliceBaseKey = message.aliceBaseKey;
  if ($aliceBaseKey !== undefined) {
    buffer.writeVarint32(106);
    buffer.writeVarint32($aliceBaseKey.length), buffer.append($aliceBaseKey);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSessionStructure = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 sessionVersion = 1;
    case 1: {
      message.sessionVersion = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes localIdentityPublic = 2;
    case 2: {
      message.localIdentityPublic = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes remoteIdentityPublic = 3;
    case 3: {
      message.remoteIdentityPublic = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes rootKey = 4;
    case 4: {
      message.rootKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint32 previousCounter = 5;
    case 5: {
      message.previousCounter = buffer.readVarint32() >>> 0;
      break;
    }

    // optional Chain senderChain = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.senderChain = proto.decodeChain(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated Chain receiverChains = 7;
    case 7: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.receiverChains || (message.receiverChains = []);
      values.push(proto.decodeChain(buffer));
      buffer.limit = limit;
      break;
    }

    // optional PendingKeyExchange pendingKeyExchange = 8;
    case 8: {
      var limit = $pushTemporaryLength(buffer);
      message.pendingKeyExchange = proto.decodePendingKeyExchange(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PendingPreKey pendingPreKey = 9;
    case 9: {
      var limit = $pushTemporaryLength(buffer);
      message.pendingPreKey = proto.decodePendingPreKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint32 remoteRegistrationId = 10;
    case 10: {
      message.remoteRegistrationId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 localRegistrationId = 11;
    case 11: {
      message.localRegistrationId = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bool needsRefresh = 12;
    case 12: {
      message.needsRefresh = !!buffer.readByte();
      break;
    }

    // optional bytes aliceBaseKey = 13;
    case 13: {
      message.aliceBaseKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSignalMessage = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes ratchetKey = 1;
  var $ratchetKey = message.ratchetKey;
  if ($ratchetKey !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($ratchetKey.length), buffer.append($ratchetKey);
  }

  // optional uint32 counter = 2;
  var $counter = message.counter;
  if ($counter !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32($counter);
  }

  // optional uint32 previousCounter = 3;
  var $previousCounter = message.previousCounter;
  if ($previousCounter !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32($previousCounter);
  }

  // optional bytes ciphertext = 4;
  var $ciphertext = message.ciphertext;
  if ($ciphertext !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($ciphertext.length), buffer.append($ciphertext);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSignalMessage = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes ratchetKey = 1;
    case 1: {
      message.ratchetKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional uint32 counter = 2;
    case 2: {
      message.counter = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 previousCounter = 3;
    case 3: {
      message.previousCounter = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes ciphertext = 4;
    case 4: {
      message.ciphertext = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSignedPreKeyRecordStructure = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 id = 1;
  var $id = message.id;
  if ($id !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint32($id);
  }

  // optional bytes publicKey = 2;
  var $publicKey = message.publicKey;
  if ($publicKey !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($publicKey.length), buffer.append($publicKey);
  }

  // optional bytes privateKey = 3;
  var $privateKey = message.privateKey;
  if ($privateKey !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($privateKey.length), buffer.append($privateKey);
  }

  // optional bytes signature = 4;
  var $signature = message.signature;
  if ($signature !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($signature.length), buffer.append($signature);
  }

  // optional fixed64 timestamp = 5;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    buffer.writeVarint32(41);
    buffer.writeUint64($coerceLong($timestamp));
  }

  return buffer.flip().toBuffer();
};

proto.decodeSignedPreKeyRecordStructure = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 id = 1;
    case 1: {
      message.id = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes publicKey = 2;
    case 2: {
      message.publicKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes privateKey = 3;
    case 3: {
      message.privateKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes signature = 4;
    case 4: {
      message.signature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional fixed64 timestamp = 5;
    case 5: {
      message.timestamp = buffer.readUint64();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeStatusPSA = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // required uint64 campaignId = 44;
  var $campaignId = message.campaignId;
  if ($campaignId !== undefined) {
    buffer.writeVarint32(352);
    buffer.writeVarint64($coerceLong($campaignId));
  }

  // optional uint64 campaignExpirationTimestamp = 45;
  var $campaignExpirationTimestamp = message.campaignExpirationTimestamp;
  if ($campaignExpirationTimestamp !== undefined) {
    buffer.writeVarint32(360);
    buffer.writeVarint64($coerceLong($campaignExpirationTimestamp));
  }

  return buffer.flip().toBuffer();
};

proto.decodeStatusPSA = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // required uint64 campaignId = 44;
    case 44: {
      message.campaignId = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint64 campaignExpirationTimestamp = 45;
    case 45: {
      message.campaignExpirationTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  if (message.campaignId === undefined)
    throw new Error("Missing required field: campaignId");

  return message;
};

proto.encodeStickerMetadata = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string url = 1;
  var $url = message.url;
  if ($url !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($url), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes fileSha256 = 2;
  var $fileSha256 = message.fileSha256;
  if ($fileSha256 !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($fileSha256.length), buffer.append($fileSha256);
  }

  // optional bytes fileEncSha256 = 3;
  var $fileEncSha256 = message.fileEncSha256;
  if ($fileEncSha256 !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($fileEncSha256.length), buffer.append($fileEncSha256);
  }

  // optional bytes mediaKey = 4;
  var $mediaKey = message.mediaKey;
  if ($mediaKey !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($mediaKey.length), buffer.append($mediaKey);
  }

  // optional string mimetype = 5;
  var $mimetype = message.mimetype;
  if ($mimetype !== undefined) {
    buffer.writeVarint32(42);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($mimetype), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint32 height = 6;
  var $height = message.height;
  if ($height !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeVarint32($height);
  }

  // optional uint32 width = 7;
  var $width = message.width;
  if ($width !== undefined) {
    buffer.writeVarint32(56);
    buffer.writeVarint32($width);
  }

  // optional string directPath = 8;
  var $directPath = message.directPath;
  if ($directPath !== undefined) {
    buffer.writeVarint32(66);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($directPath), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint64 fileLength = 9;
  var $fileLength = message.fileLength;
  if ($fileLength !== undefined) {
    buffer.writeVarint32(72);
    buffer.writeVarint64($coerceLong($fileLength));
  }

  // optional float weight = 10;
  var $weight = message.weight;
  if ($weight !== undefined) {
    buffer.writeVarint32(85);
    buffer.writeFloat($weight);
  }

  // optional int64 lastStickerSentTs = 11;
  var $lastStickerSentTs = message.lastStickerSentTs;
  if ($lastStickerSentTs !== undefined) {
    buffer.writeVarint32(88);
    buffer.writeVarint64($coerceLong($lastStickerSentTs));
  }

  // optional bool isLottie = 12;
  var $isLottie = message.isLottie;
  if ($isLottie !== undefined) {
    buffer.writeVarint32(96);
    buffer.writeByte($isLottie ? 1 : 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeStickerMetadata = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string url = 1;
    case 1: {
      message.url = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes fileSha256 = 2;
    case 2: {
      message.fileSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes fileEncSha256 = 3;
    case 3: {
      message.fileEncSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes mediaKey = 4;
    case 4: {
      message.mediaKey = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional string mimetype = 5;
    case 5: {
      message.mimetype = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint32 height = 6;
    case 6: {
      message.height = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 width = 7;
    case 7: {
      message.width = buffer.readVarint32() >>> 0;
      break;
    }

    // optional string directPath = 8;
    case 8: {
      message.directPath = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint64 fileLength = 9;
    case 9: {
      message.fileLength = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional float weight = 10;
    case 10: {
      message.weight = buffer.readFloat();
      break;
    }

    // optional int64 lastStickerSentTs = 11;
    case 11: {
      message.lastStickerSentTs = buffer.readVarint64();
      break;
    }

    // optional bool isLottie = 12;
    case 12: {
      message.isLottie = !!buffer.readByte();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncActionData = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes index = 1;
  var $index = message.index;
  if ($index !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($index.length), buffer.append($index);
  }

  // optional SyncActionValue value = 2;
  var $value = message.value;
  if ($value !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeSyncActionValue($value);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bytes padding = 3;
  var $padding = message.padding;
  if ($padding !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($padding.length), buffer.append($padding);
  }

  // optional int32 version = 4;
  var $version = message.version;
  if ($version !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint64($version | 0);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncActionData = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes index = 1;
    case 1: {
      message.index = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional SyncActionValue value = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.value = proto.decodeSyncActionValue(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bytes padding = 3;
    case 3: {
      message.padding = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional int32 version = 4;
    case 4: {
      message.version = buffer.readVarint32();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncActionValue = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional int64 timestamp = 1;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint64($coerceLong($timestamp));
  }

  // optional StarAction starAction = 2;
  var $starAction = message.starAction;
  if ($starAction !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeStarAction($starAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ContactAction contactAction = 3;
  var $contactAction = message.contactAction;
  if ($contactAction !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeContactAction($contactAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MuteAction muteAction = 4;
  var $muteAction = message.muteAction;
  if ($muteAction !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeMuteAction($muteAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PinAction pinAction = 5;
  var $pinAction = message.pinAction;
  if ($pinAction !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodePinAction($pinAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SecurityNotificationSetting securityNotificationSetting = 6;
  var $securityNotificationSetting = message.securityNotificationSetting;
  if ($securityNotificationSetting !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeSecurityNotificationSetting($securityNotificationSetting);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PushNameSetting pushNameSetting = 7;
  var $pushNameSetting = message.pushNameSetting;
  if ($pushNameSetting !== undefined) {
    buffer.writeVarint32(58);
    var nested = proto.encodePushNameSetting($pushNameSetting);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional QuickReplyAction quickReplyAction = 8;
  var $quickReplyAction = message.quickReplyAction;
  if ($quickReplyAction !== undefined) {
    buffer.writeVarint32(66);
    var nested = proto.encodeQuickReplyAction($quickReplyAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional RecentEmojiWeightsAction recentEmojiWeightsAction = 11;
  var $recentEmojiWeightsAction = message.recentEmojiWeightsAction;
  if ($recentEmojiWeightsAction !== undefined) {
    buffer.writeVarint32(90);
    var nested = proto.encodeRecentEmojiWeightsAction($recentEmojiWeightsAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional LabelEditAction labelEditAction = 14;
  var $labelEditAction = message.labelEditAction;
  if ($labelEditAction !== undefined) {
    buffer.writeVarint32(114);
    var nested = proto.encodeLabelEditAction($labelEditAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional LabelAssociationAction labelAssociationAction = 15;
  var $labelAssociationAction = message.labelAssociationAction;
  if ($labelAssociationAction !== undefined) {
    buffer.writeVarint32(122);
    var nested = proto.encodeLabelAssociationAction($labelAssociationAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional LocaleSetting localeSetting = 16;
  var $localeSetting = message.localeSetting;
  if ($localeSetting !== undefined) {
    buffer.writeVarint32(130);
    var nested = proto.encodeLocaleSetting($localeSetting);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ArchiveChatAction archiveChatAction = 17;
  var $archiveChatAction = message.archiveChatAction;
  if ($archiveChatAction !== undefined) {
    buffer.writeVarint32(138);
    var nested = proto.encodeArchiveChatAction($archiveChatAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional DeleteMessageForMeAction deleteMessageForMeAction = 18;
  var $deleteMessageForMeAction = message.deleteMessageForMeAction;
  if ($deleteMessageForMeAction !== undefined) {
    buffer.writeVarint32(146);
    var nested = proto.encodeDeleteMessageForMeAction($deleteMessageForMeAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional KeyExpiration keyExpiration = 19;
  var $keyExpiration = message.keyExpiration;
  if ($keyExpiration !== undefined) {
    buffer.writeVarint32(154);
    var nested = proto.encodeKeyExpiration($keyExpiration);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MarkChatAsReadAction markChatAsReadAction = 20;
  var $markChatAsReadAction = message.markChatAsReadAction;
  if ($markChatAsReadAction !== undefined) {
    buffer.writeVarint32(162);
    var nested = proto.encodeMarkChatAsReadAction($markChatAsReadAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ClearChatAction clearChatAction = 21;
  var $clearChatAction = message.clearChatAction;
  if ($clearChatAction !== undefined) {
    buffer.writeVarint32(170);
    var nested = proto.encodeClearChatAction($clearChatAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional DeleteChatAction deleteChatAction = 22;
  var $deleteChatAction = message.deleteChatAction;
  if ($deleteChatAction !== undefined) {
    buffer.writeVarint32(178);
    var nested = proto.encodeDeleteChatAction($deleteChatAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional UnarchiveChatsSetting unarchiveChatsSetting = 23;
  var $unarchiveChatsSetting = message.unarchiveChatsSetting;
  if ($unarchiveChatsSetting !== undefined) {
    buffer.writeVarint32(186);
    var nested = proto.encodeUnarchiveChatsSetting($unarchiveChatsSetting);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PrimaryFeature primaryFeature = 24;
  var $primaryFeature = message.primaryFeature;
  if ($primaryFeature !== undefined) {
    buffer.writeVarint32(194);
    var nested = proto.encodePrimaryFeature($primaryFeature);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional AndroidUnsupportedActions androidUnsupportedActions = 26;
  var $androidUnsupportedActions = message.androidUnsupportedActions;
  if ($androidUnsupportedActions !== undefined) {
    buffer.writeVarint32(210);
    var nested = proto.encodeAndroidUnsupportedActions($androidUnsupportedActions);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional AgentAction agentAction = 27;
  var $agentAction = message.agentAction;
  if ($agentAction !== undefined) {
    buffer.writeVarint32(218);
    var nested = proto.encodeAgentAction($agentAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SubscriptionAction subscriptionAction = 28;
  var $subscriptionAction = message.subscriptionAction;
  if ($subscriptionAction !== undefined) {
    buffer.writeVarint32(226);
    var nested = proto.encodeSubscriptionAction($subscriptionAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional UserStatusMuteAction userStatusMuteAction = 29;
  var $userStatusMuteAction = message.userStatusMuteAction;
  if ($userStatusMuteAction !== undefined) {
    buffer.writeVarint32(234);
    var nested = proto.encodeUserStatusMuteAction($userStatusMuteAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional TimeFormatAction timeFormatAction = 30;
  var $timeFormatAction = message.timeFormatAction;
  if ($timeFormatAction !== undefined) {
    buffer.writeVarint32(242);
    var nested = proto.encodeTimeFormatAction($timeFormatAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional NuxAction nuxAction = 31;
  var $nuxAction = message.nuxAction;
  if ($nuxAction !== undefined) {
    buffer.writeVarint32(250);
    var nested = proto.encodeNuxAction($nuxAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PrimaryVersionAction primaryVersionAction = 32;
  var $primaryVersionAction = message.primaryVersionAction;
  if ($primaryVersionAction !== undefined) {
    buffer.writeVarint32(258);
    var nested = proto.encodePrimaryVersionAction($primaryVersionAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional StickerAction stickerAction = 33;
  var $stickerAction = message.stickerAction;
  if ($stickerAction !== undefined) {
    buffer.writeVarint32(266);
    var nested = proto.encodeStickerAction($stickerAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional RemoveRecentStickerAction removeRecentStickerAction = 34;
  var $removeRecentStickerAction = message.removeRecentStickerAction;
  if ($removeRecentStickerAction !== undefined) {
    buffer.writeVarint32(274);
    var nested = proto.encodeRemoveRecentStickerAction($removeRecentStickerAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ChatAssignmentAction chatAssignment = 35;
  var $chatAssignment = message.chatAssignment;
  if ($chatAssignment !== undefined) {
    buffer.writeVarint32(282);
    var nested = proto.encodeChatAssignmentAction($chatAssignment);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ChatAssignmentOpenedStatusAction chatAssignmentOpenedStatus = 36;
  var $chatAssignmentOpenedStatus = message.chatAssignmentOpenedStatus;
  if ($chatAssignmentOpenedStatus !== undefined) {
    buffer.writeVarint32(290);
    var nested = proto.encodeChatAssignmentOpenedStatusAction($chatAssignmentOpenedStatus);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PnForLidChatAction pnForLidChatAction = 37;
  var $pnForLidChatAction = message.pnForLidChatAction;
  if ($pnForLidChatAction !== undefined) {
    buffer.writeVarint32(298);
    var nested = proto.encodePnForLidChatAction($pnForLidChatAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MarketingMessageAction marketingMessageAction = 38;
  var $marketingMessageAction = message.marketingMessageAction;
  if ($marketingMessageAction !== undefined) {
    buffer.writeVarint32(306);
    var nested = proto.encodeMarketingMessageAction($marketingMessageAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional MarketingMessageBroadcastAction marketingMessageBroadcastAction = 39;
  var $marketingMessageBroadcastAction = message.marketingMessageBroadcastAction;
  if ($marketingMessageBroadcastAction !== undefined) {
    buffer.writeVarint32(314);
    var nested = proto.encodeMarketingMessageBroadcastAction($marketingMessageBroadcastAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ExternalWebBetaAction externalWebBetaAction = 40;
  var $externalWebBetaAction = message.externalWebBetaAction;
  if ($externalWebBetaAction !== undefined) {
    buffer.writeVarint32(322);
    var nested = proto.encodeExternalWebBetaAction($externalWebBetaAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PrivacySettingRelayAllCalls privacySettingRelayAllCalls = 41;
  var $privacySettingRelayAllCalls = message.privacySettingRelayAllCalls;
  if ($privacySettingRelayAllCalls !== undefined) {
    buffer.writeVarint32(330);
    var nested = proto.encodePrivacySettingRelayAllCalls($privacySettingRelayAllCalls);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional CallLogAction callLogAction = 42;
  var $callLogAction = message.callLogAction;
  if ($callLogAction !== undefined) {
    buffer.writeVarint32(338);
    var nested = proto.encodeCallLogAction($callLogAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional StatusPrivacyAction statusPrivacy = 44;
  var $statusPrivacy = message.statusPrivacy;
  if ($statusPrivacy !== undefined) {
    buffer.writeVarint32(354);
    var nested = proto.encodeStatusPrivacyAction($statusPrivacy);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional BotWelcomeRequestAction botWelcomeRequestAction = 45;
  var $botWelcomeRequestAction = message.botWelcomeRequestAction;
  if ($botWelcomeRequestAction !== undefined) {
    buffer.writeVarint32(362);
    var nested = proto.encodeBotWelcomeRequestAction($botWelcomeRequestAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional DeleteIndividualCallLogAction deleteIndividualCallLog = 46;
  var $deleteIndividualCallLog = message.deleteIndividualCallLog;
  if ($deleteIndividualCallLog !== undefined) {
    buffer.writeVarint32(370);
    var nested = proto.encodeDeleteIndividualCallLogAction($deleteIndividualCallLog);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional LabelReorderingAction labelReorderingAction = 47;
  var $labelReorderingAction = message.labelReorderingAction;
  if ($labelReorderingAction !== undefined) {
    buffer.writeVarint32(378);
    var nested = proto.encodeLabelReorderingAction($labelReorderingAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PaymentInfoAction paymentInfoAction = 48;
  var $paymentInfoAction = message.paymentInfoAction;
  if ($paymentInfoAction !== undefined) {
    buffer.writeVarint32(386);
    var nested = proto.encodePaymentInfoAction($paymentInfoAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional CustomPaymentMethodsAction customPaymentMethodsAction = 49;
  var $customPaymentMethodsAction = message.customPaymentMethodsAction;
  if ($customPaymentMethodsAction !== undefined) {
    buffer.writeVarint32(394);
    var nested = proto.encodeCustomPaymentMethodsAction($customPaymentMethodsAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional LockChatAction lockChatAction = 50;
  var $lockChatAction = message.lockChatAction;
  if ($lockChatAction !== undefined) {
    buffer.writeVarint32(402);
    var nested = proto.encodeLockChatAction($lockChatAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ChatLockSettings chatLockSettings = 51;
  var $chatLockSettings = message.chatLockSettings;
  if ($chatLockSettings !== undefined) {
    buffer.writeVarint32(410);
    var nested = proto.encodeChatLockSettings($chatLockSettings);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional WamoUserIdentifierAction wamoUserIdentifierAction = 52;
  var $wamoUserIdentifierAction = message.wamoUserIdentifierAction;
  if ($wamoUserIdentifierAction !== undefined) {
    buffer.writeVarint32(418);
    var nested = proto.encodeWamoUserIdentifierAction($wamoUserIdentifierAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PrivacySettingDisableLinkPreviewsAction privacySettingDisableLinkPreviewsAction = 53;
  var $privacySettingDisableLinkPreviewsAction = message.privacySettingDisableLinkPreviewsAction;
  if ($privacySettingDisableLinkPreviewsAction !== undefined) {
    buffer.writeVarint32(426);
    var nested = proto.encodePrivacySettingDisableLinkPreviewsAction($privacySettingDisableLinkPreviewsAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional DeviceCapabilities deviceCapabilities = 54;
  var $deviceCapabilities = message.deviceCapabilities;
  if ($deviceCapabilities !== undefined) {
    buffer.writeVarint32(434);
    var nested = proto.encodeDeviceCapabilities($deviceCapabilities);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional NoteEditAction noteEditAction = 55;
  var $noteEditAction = message.noteEditAction;
  if ($noteEditAction !== undefined) {
    buffer.writeVarint32(442);
    var nested = proto.encodeNoteEditAction($noteEditAction);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncActionValue = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional int64 timestamp = 1;
    case 1: {
      message.timestamp = buffer.readVarint64();
      break;
    }

    // optional StarAction starAction = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.starAction = proto.decodeStarAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ContactAction contactAction = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.contactAction = proto.decodeContactAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MuteAction muteAction = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.muteAction = proto.decodeMuteAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PinAction pinAction = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.pinAction = proto.decodePinAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SecurityNotificationSetting securityNotificationSetting = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.securityNotificationSetting = proto.decodeSecurityNotificationSetting(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PushNameSetting pushNameSetting = 7;
    case 7: {
      var limit = $pushTemporaryLength(buffer);
      message.pushNameSetting = proto.decodePushNameSetting(buffer);
      buffer.limit = limit;
      break;
    }

    // optional QuickReplyAction quickReplyAction = 8;
    case 8: {
      var limit = $pushTemporaryLength(buffer);
      message.quickReplyAction = proto.decodeQuickReplyAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional RecentEmojiWeightsAction recentEmojiWeightsAction = 11;
    case 11: {
      var limit = $pushTemporaryLength(buffer);
      message.recentEmojiWeightsAction = proto.decodeRecentEmojiWeightsAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional LabelEditAction labelEditAction = 14;
    case 14: {
      var limit = $pushTemporaryLength(buffer);
      message.labelEditAction = proto.decodeLabelEditAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional LabelAssociationAction labelAssociationAction = 15;
    case 15: {
      var limit = $pushTemporaryLength(buffer);
      message.labelAssociationAction = proto.decodeLabelAssociationAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional LocaleSetting localeSetting = 16;
    case 16: {
      var limit = $pushTemporaryLength(buffer);
      message.localeSetting = proto.decodeLocaleSetting(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ArchiveChatAction archiveChatAction = 17;
    case 17: {
      var limit = $pushTemporaryLength(buffer);
      message.archiveChatAction = proto.decodeArchiveChatAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional DeleteMessageForMeAction deleteMessageForMeAction = 18;
    case 18: {
      var limit = $pushTemporaryLength(buffer);
      message.deleteMessageForMeAction = proto.decodeDeleteMessageForMeAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional KeyExpiration keyExpiration = 19;
    case 19: {
      var limit = $pushTemporaryLength(buffer);
      message.keyExpiration = proto.decodeKeyExpiration(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MarkChatAsReadAction markChatAsReadAction = 20;
    case 20: {
      var limit = $pushTemporaryLength(buffer);
      message.markChatAsReadAction = proto.decodeMarkChatAsReadAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ClearChatAction clearChatAction = 21;
    case 21: {
      var limit = $pushTemporaryLength(buffer);
      message.clearChatAction = proto.decodeClearChatAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional DeleteChatAction deleteChatAction = 22;
    case 22: {
      var limit = $pushTemporaryLength(buffer);
      message.deleteChatAction = proto.decodeDeleteChatAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional UnarchiveChatsSetting unarchiveChatsSetting = 23;
    case 23: {
      var limit = $pushTemporaryLength(buffer);
      message.unarchiveChatsSetting = proto.decodeUnarchiveChatsSetting(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PrimaryFeature primaryFeature = 24;
    case 24: {
      var limit = $pushTemporaryLength(buffer);
      message.primaryFeature = proto.decodePrimaryFeature(buffer);
      buffer.limit = limit;
      break;
    }

    // optional AndroidUnsupportedActions androidUnsupportedActions = 26;
    case 26: {
      var limit = $pushTemporaryLength(buffer);
      message.androidUnsupportedActions = proto.decodeAndroidUnsupportedActions(buffer);
      buffer.limit = limit;
      break;
    }

    // optional AgentAction agentAction = 27;
    case 27: {
      var limit = $pushTemporaryLength(buffer);
      message.agentAction = proto.decodeAgentAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SubscriptionAction subscriptionAction = 28;
    case 28: {
      var limit = $pushTemporaryLength(buffer);
      message.subscriptionAction = proto.decodeSubscriptionAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional UserStatusMuteAction userStatusMuteAction = 29;
    case 29: {
      var limit = $pushTemporaryLength(buffer);
      message.userStatusMuteAction = proto.decodeUserStatusMuteAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional TimeFormatAction timeFormatAction = 30;
    case 30: {
      var limit = $pushTemporaryLength(buffer);
      message.timeFormatAction = proto.decodeTimeFormatAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional NuxAction nuxAction = 31;
    case 31: {
      var limit = $pushTemporaryLength(buffer);
      message.nuxAction = proto.decodeNuxAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PrimaryVersionAction primaryVersionAction = 32;
    case 32: {
      var limit = $pushTemporaryLength(buffer);
      message.primaryVersionAction = proto.decodePrimaryVersionAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional StickerAction stickerAction = 33;
    case 33: {
      var limit = $pushTemporaryLength(buffer);
      message.stickerAction = proto.decodeStickerAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional RemoveRecentStickerAction removeRecentStickerAction = 34;
    case 34: {
      var limit = $pushTemporaryLength(buffer);
      message.removeRecentStickerAction = proto.decodeRemoveRecentStickerAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ChatAssignmentAction chatAssignment = 35;
    case 35: {
      var limit = $pushTemporaryLength(buffer);
      message.chatAssignment = proto.decodeChatAssignmentAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ChatAssignmentOpenedStatusAction chatAssignmentOpenedStatus = 36;
    case 36: {
      var limit = $pushTemporaryLength(buffer);
      message.chatAssignmentOpenedStatus = proto.decodeChatAssignmentOpenedStatusAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PnForLidChatAction pnForLidChatAction = 37;
    case 37: {
      var limit = $pushTemporaryLength(buffer);
      message.pnForLidChatAction = proto.decodePnForLidChatAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MarketingMessageAction marketingMessageAction = 38;
    case 38: {
      var limit = $pushTemporaryLength(buffer);
      message.marketingMessageAction = proto.decodeMarketingMessageAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional MarketingMessageBroadcastAction marketingMessageBroadcastAction = 39;
    case 39: {
      var limit = $pushTemporaryLength(buffer);
      message.marketingMessageBroadcastAction = proto.decodeMarketingMessageBroadcastAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ExternalWebBetaAction externalWebBetaAction = 40;
    case 40: {
      var limit = $pushTemporaryLength(buffer);
      message.externalWebBetaAction = proto.decodeExternalWebBetaAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PrivacySettingRelayAllCalls privacySettingRelayAllCalls = 41;
    case 41: {
      var limit = $pushTemporaryLength(buffer);
      message.privacySettingRelayAllCalls = proto.decodePrivacySettingRelayAllCalls(buffer);
      buffer.limit = limit;
      break;
    }

    // optional CallLogAction callLogAction = 42;
    case 42: {
      var limit = $pushTemporaryLength(buffer);
      message.callLogAction = proto.decodeCallLogAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional StatusPrivacyAction statusPrivacy = 44;
    case 44: {
      var limit = $pushTemporaryLength(buffer);
      message.statusPrivacy = proto.decodeStatusPrivacyAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional BotWelcomeRequestAction botWelcomeRequestAction = 45;
    case 45: {
      var limit = $pushTemporaryLength(buffer);
      message.botWelcomeRequestAction = proto.decodeBotWelcomeRequestAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional DeleteIndividualCallLogAction deleteIndividualCallLog = 46;
    case 46: {
      var limit = $pushTemporaryLength(buffer);
      message.deleteIndividualCallLog = proto.decodeDeleteIndividualCallLogAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional LabelReorderingAction labelReorderingAction = 47;
    case 47: {
      var limit = $pushTemporaryLength(buffer);
      message.labelReorderingAction = proto.decodeLabelReorderingAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PaymentInfoAction paymentInfoAction = 48;
    case 48: {
      var limit = $pushTemporaryLength(buffer);
      message.paymentInfoAction = proto.decodePaymentInfoAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional CustomPaymentMethodsAction customPaymentMethodsAction = 49;
    case 49: {
      var limit = $pushTemporaryLength(buffer);
      message.customPaymentMethodsAction = proto.decodeCustomPaymentMethodsAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional LockChatAction lockChatAction = 50;
    case 50: {
      var limit = $pushTemporaryLength(buffer);
      message.lockChatAction = proto.decodeLockChatAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ChatLockSettings chatLockSettings = 51;
    case 51: {
      var limit = $pushTemporaryLength(buffer);
      message.chatLockSettings = proto.decodeChatLockSettings(buffer);
      buffer.limit = limit;
      break;
    }

    // optional WamoUserIdentifierAction wamoUserIdentifierAction = 52;
    case 52: {
      var limit = $pushTemporaryLength(buffer);
      message.wamoUserIdentifierAction = proto.decodeWamoUserIdentifierAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PrivacySettingDisableLinkPreviewsAction privacySettingDisableLinkPreviewsAction = 53;
    case 53: {
      var limit = $pushTemporaryLength(buffer);
      message.privacySettingDisableLinkPreviewsAction = proto.decodePrivacySettingDisableLinkPreviewsAction(buffer);
      buffer.limit = limit;
      break;
    }

    // optional DeviceCapabilities deviceCapabilities = 54;
    case 54: {
      var limit = $pushTemporaryLength(buffer);
      message.deviceCapabilities = proto.decodeDeviceCapabilities(buffer);
      buffer.limit = limit;
      break;
    }

    // optional NoteEditAction noteEditAction = 55;
    case 55: {
      var limit = $pushTemporaryLength(buffer);
      message.noteEditAction = proto.decodeNoteEditAction(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdIndex = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes blob = 1;
  var $blob = message.blob;
  if ($blob !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($blob.length), buffer.append($blob);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdIndex = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes blob = 1;
    case 1: {
      message.blob = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdMutation = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional SyncdOperation operation = 1;
  var $operation = message.operation;
  if ($operation !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeSyncdOperation($operation);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SyncdRecord record = 2;
  var $record = message.record;
  if ($record !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeSyncdRecord($record);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdMutation = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional SyncdOperation operation = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.operation = proto.decodeSyncdOperation(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SyncdRecord record = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.record = proto.decodeSyncdRecord(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdMutations = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // repeated SyncdMutation mutations = 1;
  var array$mutations = message.mutations;
  if (array$mutations !== undefined) {
    for (var i = 0; i < array$mutations.length; i++) {
      var $mutations = array$mutations[i];
      var nested = proto.encodeSyncdMutation($mutations);
      buffer.writeVarint32(10);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdMutations = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // repeated SyncdMutation mutations = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.mutations || (message.mutations = []);
      values.push(proto.decodeSyncdMutation(buffer));
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdPatch = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional SyncdVersion version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeSyncdVersion($version);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated SyncdMutation mutations = 2;
  var array$mutations = message.mutations;
  if (array$mutations !== undefined) {
    for (var i = 0; i < array$mutations.length; i++) {
      var $mutations = array$mutations[i];
      var nested = proto.encodeSyncdMutation($mutations);
      buffer.writeVarint32(18);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional ExternalBlobReference externalMutations = 3;
  var $externalMutations = message.externalMutations;
  if ($externalMutations !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeExternalBlobReference($externalMutations);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bytes snapshotMac = 4;
  var $snapshotMac = message.snapshotMac;
  if ($snapshotMac !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($snapshotMac.length), buffer.append($snapshotMac);
  }

  // optional bytes patchMac = 5;
  var $patchMac = message.patchMac;
  if ($patchMac !== undefined) {
    buffer.writeVarint32(42);
    buffer.writeVarint32($patchMac.length), buffer.append($patchMac);
  }

  // optional KeyId keyId = 6;
  var $keyId = message.keyId;
  if ($keyId !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeKeyId($keyId);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional ExitCode exitCode = 7;
  var $exitCode = message.exitCode;
  if ($exitCode !== undefined) {
    buffer.writeVarint32(58);
    var nested = proto.encodeExitCode($exitCode);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint32 deviceIndex = 8;
  var $deviceIndex = message.deviceIndex;
  if ($deviceIndex !== undefined) {
    buffer.writeVarint32(64);
    buffer.writeVarint32($deviceIndex);
  }

  // optional bytes clientDebugData = 9;
  var $clientDebugData = message.clientDebugData;
  if ($clientDebugData !== undefined) {
    buffer.writeVarint32(74);
    buffer.writeVarint32($clientDebugData.length), buffer.append($clientDebugData);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdPatch = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional SyncdVersion version = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.version = proto.decodeSyncdVersion(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated SyncdMutation mutations = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.mutations || (message.mutations = []);
      values.push(proto.decodeSyncdMutation(buffer));
      buffer.limit = limit;
      break;
    }

    // optional ExternalBlobReference externalMutations = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.externalMutations = proto.decodeExternalBlobReference(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bytes snapshotMac = 4;
    case 4: {
      message.snapshotMac = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes patchMac = 5;
    case 5: {
      message.patchMac = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional KeyId keyId = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.keyId = proto.decodeKeyId(buffer);
      buffer.limit = limit;
      break;
    }

    // optional ExitCode exitCode = 7;
    case 7: {
      var limit = $pushTemporaryLength(buffer);
      message.exitCode = proto.decodeExitCode(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint32 deviceIndex = 8;
    case 8: {
      message.deviceIndex = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bytes clientDebugData = 9;
    case 9: {
      message.clientDebugData = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdRecord = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional SyncdIndex index = 1;
  var $index = message.index;
  if ($index !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeSyncdIndex($index);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional SyncdValue value = 2;
  var $value = message.value;
  if ($value !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeSyncdValue($value);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional KeyId keyId = 3;
  var $keyId = message.keyId;
  if ($keyId !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeKeyId($keyId);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdRecord = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional SyncdIndex index = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.index = proto.decodeSyncdIndex(buffer);
      buffer.limit = limit;
      break;
    }

    // optional SyncdValue value = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.value = proto.decodeSyncdValue(buffer);
      buffer.limit = limit;
      break;
    }

    // optional KeyId keyId = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.keyId = proto.decodeKeyId(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdSnapshot = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional SyncdVersion version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeSyncdVersion($version);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated SyncdRecord records = 2;
  var array$records = message.records;
  if (array$records !== undefined) {
    for (var i = 0; i < array$records.length; i++) {
      var $records = array$records[i];
      var nested = proto.encodeSyncdRecord($records);
      buffer.writeVarint32(18);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional bytes mac = 3;
  var $mac = message.mac;
  if ($mac !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($mac.length), buffer.append($mac);
  }

  // optional KeyId keyId = 4;
  var $keyId = message.keyId;
  if ($keyId !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeKeyId($keyId);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdSnapshot = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional SyncdVersion version = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.version = proto.decodeSyncdVersion(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated SyncdRecord records = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.records || (message.records = []);
      values.push(proto.decodeSyncdRecord(buffer));
      buffer.limit = limit;
      break;
    }

    // optional bytes mac = 3;
    case 3: {
      message.mac = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional KeyId keyId = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.keyId = proto.decodeKeyId(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdValue = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes blob = 1;
  var $blob = message.blob;
  if ($blob !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($blob.length), buffer.append($blob);
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdValue = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes blob = 1;
    case 1: {
      message.blob = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeSyncdVersion = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint64 version = 1;
  var $version = message.version;
  if ($version !== undefined) {
    buffer.writeVarint32(8);
    buffer.writeVarint64($coerceLong($version));
  }

  return buffer.flip().toBuffer();
};

proto.decodeSyncdVersion = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint64 version = 1;
    case 1: {
      message.version = buffer.readVarint64().toUnsigned();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeTemplateButton = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint32 index = 4;
  var $index = message.index;
  if ($index !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint32($index);
  }

  // optional TemplateButton.QuickReplyButton quickReplyButton = 1;
  var $quickReplyButton = message.quickReplyButton;
  if ($quickReplyButton !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeTemplateButton.QuickReplyButton($quickReplyButton);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional TemplateButton.URLButton urlButton = 2;
  var $urlButton = message.urlButton;
  if ($urlButton !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeTemplateButton.URLButton($urlButton);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional TemplateButton.CallButton callButton = 3;
  var $callButton = message.callButton;
  if ($callButton !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeTemplateButton.CallButton($callButton);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeTemplateButton = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint32 index = 4;
    case 4: {
      message.index = buffer.readVarint32() >>> 0;
      break;
    }

    // optional TemplateButton.QuickReplyButton quickReplyButton = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.quickReplyButton = proto.decodeTemplateButton.QuickReplyButton(buffer);
      buffer.limit = limit;
      break;
    }

    // optional TemplateButton.URLButton urlButton = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.urlButton = proto.decodeTemplateButton.URLButton(buffer);
      buffer.limit = limit;
      break;
    }

    // optional TemplateButton.CallButton callButton = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.callButton = proto.decodeTemplateButton.CallButton(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeUserPassword = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional Encoding encoding = 1;
  var $encoding = message.encoding;
  if ($encoding !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeEncoding($encoding);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Transformer transformer = 2;
  var $transformer = message.transformer;
  if ($transformer !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeTransformer($transformer);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated TransformerArg transformerArg = 3;
  var array$transformerArg = message.transformerArg;
  if (array$transformerArg !== undefined) {
    for (var i = 0; i < array$transformerArg.length; i++) {
      var $transformerArg = array$transformerArg[i];
      var nested = proto.encodeTransformerArg($transformerArg);
      buffer.writeVarint32(26);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional bytes transformedData = 4;
  var $transformedData = message.transformedData;
  if ($transformedData !== undefined) {
    buffer.writeVarint32(34);
    buffer.writeVarint32($transformedData.length), buffer.append($transformedData);
  }

  return buffer.flip().toBuffer();
};

proto.decodeUserPassword = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional Encoding encoding = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.encoding = proto.decodeEncoding(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Transformer transformer = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.transformer = proto.decodeTransformer(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated TransformerArg transformerArg = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.transformerArg || (message.transformerArg = []);
      values.push(proto.decodeTransformerArg(buffer));
      buffer.limit = limit;
      break;
    }

    // optional bytes transformedData = 4;
    case 4: {
      message.transformedData = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeUserReceipt = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // required string userJid = 1;
  var $userJid = message.userJid;
  if ($userJid !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($userJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional int64 receiptTimestamp = 2;
  var $receiptTimestamp = message.receiptTimestamp;
  if ($receiptTimestamp !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($receiptTimestamp));
  }

  // optional int64 readTimestamp = 3;
  var $readTimestamp = message.readTimestamp;
  if ($readTimestamp !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($readTimestamp));
  }

  // optional int64 playedTimestamp = 4;
  var $playedTimestamp = message.playedTimestamp;
  if ($playedTimestamp !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint64($coerceLong($playedTimestamp));
  }

  // repeated string pendingDeviceJid = 5;
  var array$pendingDeviceJid = message.pendingDeviceJid;
  if (array$pendingDeviceJid !== undefined) {
    for (var i = 0; i < array$pendingDeviceJid.length; i++) {
      var $pendingDeviceJid = array$pendingDeviceJid[i];
      var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
      buffer.writeVarint32(42);
      nested.writeUTF8String($pendingDeviceJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
    }
  }

  // repeated string deliveredDeviceJid = 6;
  var array$deliveredDeviceJid = message.deliveredDeviceJid;
  if (array$deliveredDeviceJid !== undefined) {
    for (var i = 0; i < array$deliveredDeviceJid.length; i++) {
      var $deliveredDeviceJid = array$deliveredDeviceJid[i];
      var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
      buffer.writeVarint32(50);
      nested.writeUTF8String($deliveredDeviceJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodeUserReceipt = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // required string userJid = 1;
    case 1: {
      message.userJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional int64 receiptTimestamp = 2;
    case 2: {
      message.receiptTimestamp = buffer.readVarint64();
      break;
    }

    // optional int64 readTimestamp = 3;
    case 3: {
      message.readTimestamp = buffer.readVarint64();
      break;
    }

    // optional int64 playedTimestamp = 4;
    case 4: {
      message.playedTimestamp = buffer.readVarint64();
      break;
    }

    // repeated string pendingDeviceJid = 5;
    case 5: {
      var values = message.pendingDeviceJid || (message.pendingDeviceJid = []);
      values.push(buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES));
      break;
    }

    // repeated string deliveredDeviceJid = 6;
    case 6: {
      var values = message.deliveredDeviceJid || (message.deliveredDeviceJid = []);
      values.push(buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES));
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  if (message.userJid === undefined)
    throw new Error("Missing required field: userJid");

  return message;
};

proto.encodeVerifiedNameCertificate = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional bytes details = 1;
  var $details = message.details;
  if ($details !== undefined) {
    buffer.writeVarint32(10);
    buffer.writeVarint32($details.length), buffer.append($details);
  }

  // optional bytes signature = 2;
  var $signature = message.signature;
  if ($signature !== undefined) {
    buffer.writeVarint32(18);
    buffer.writeVarint32($signature.length), buffer.append($signature);
  }

  // optional bytes serverSignature = 3;
  var $serverSignature = message.serverSignature;
  if ($serverSignature !== undefined) {
    buffer.writeVarint32(26);
    buffer.writeVarint32($serverSignature.length), buffer.append($serverSignature);
  }

  return buffer.flip().toBuffer();
};

proto.decodeVerifiedNameCertificate = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional bytes details = 1;
    case 1: {
      message.details = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes signature = 2;
    case 2: {
      message.signature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bytes serverSignature = 3;
    case 3: {
      message.serverSignature = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeWallpaperSettings = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional string filename = 1;
  var $filename = message.filename;
  if ($filename !== undefined) {
    buffer.writeVarint32(10);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($filename), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint32 opacity = 2;
  var $opacity = message.opacity;
  if ($opacity !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint32($opacity);
  }

  return buffer.flip().toBuffer();
};

proto.decodeWallpaperSettings = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional string filename = 1;
    case 1: {
      message.filename = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint32 opacity = 2;
    case 2: {
      message.opacity = buffer.readVarint32() >>> 0;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeWebFeatures = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional Flag labelsDisplay = 1;
  var $labelsDisplay = message.labelsDisplay;
  if ($labelsDisplay !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeFlag($labelsDisplay);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag voipIndividualOutgoing = 2;
  var $voipIndividualOutgoing = message.voipIndividualOutgoing;
  if ($voipIndividualOutgoing !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeFlag($voipIndividualOutgoing);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag groupsV3 = 3;
  var $groupsV3 = message.groupsV3;
  if ($groupsV3 !== undefined) {
    buffer.writeVarint32(26);
    var nested = proto.encodeFlag($groupsV3);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag groupsV3Create = 4;
  var $groupsV3Create = message.groupsV3Create;
  if ($groupsV3Create !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeFlag($groupsV3Create);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag changeNumberV2 = 5;
  var $changeNumberV2 = message.changeNumberV2;
  if ($changeNumberV2 !== undefined) {
    buffer.writeVarint32(42);
    var nested = proto.encodeFlag($changeNumberV2);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag queryStatusV3Thumbnail = 6;
  var $queryStatusV3Thumbnail = message.queryStatusV3Thumbnail;
  if ($queryStatusV3Thumbnail !== undefined) {
    buffer.writeVarint32(50);
    var nested = proto.encodeFlag($queryStatusV3Thumbnail);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag liveLocations = 7;
  var $liveLocations = message.liveLocations;
  if ($liveLocations !== undefined) {
    buffer.writeVarint32(58);
    var nested = proto.encodeFlag($liveLocations);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag queryVname = 8;
  var $queryVname = message.queryVname;
  if ($queryVname !== undefined) {
    buffer.writeVarint32(66);
    var nested = proto.encodeFlag($queryVname);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag voipIndividualIncoming = 9;
  var $voipIndividualIncoming = message.voipIndividualIncoming;
  if ($voipIndividualIncoming !== undefined) {
    buffer.writeVarint32(74);
    var nested = proto.encodeFlag($voipIndividualIncoming);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag quickRepliesQuery = 10;
  var $quickRepliesQuery = message.quickRepliesQuery;
  if ($quickRepliesQuery !== undefined) {
    buffer.writeVarint32(82);
    var nested = proto.encodeFlag($quickRepliesQuery);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag payments = 11;
  var $payments = message.payments;
  if ($payments !== undefined) {
    buffer.writeVarint32(90);
    var nested = proto.encodeFlag($payments);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag stickerPackQuery = 12;
  var $stickerPackQuery = message.stickerPackQuery;
  if ($stickerPackQuery !== undefined) {
    buffer.writeVarint32(98);
    var nested = proto.encodeFlag($stickerPackQuery);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag liveLocationsFinal = 13;
  var $liveLocationsFinal = message.liveLocationsFinal;
  if ($liveLocationsFinal !== undefined) {
    buffer.writeVarint32(106);
    var nested = proto.encodeFlag($liveLocationsFinal);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag labelsEdit = 14;
  var $labelsEdit = message.labelsEdit;
  if ($labelsEdit !== undefined) {
    buffer.writeVarint32(114);
    var nested = proto.encodeFlag($labelsEdit);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag mediaUpload = 15;
  var $mediaUpload = message.mediaUpload;
  if ($mediaUpload !== undefined) {
    buffer.writeVarint32(122);
    var nested = proto.encodeFlag($mediaUpload);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag mediaUploadRichQuickReplies = 18;
  var $mediaUploadRichQuickReplies = message.mediaUploadRichQuickReplies;
  if ($mediaUploadRichQuickReplies !== undefined) {
    buffer.writeVarint32(146);
    var nested = proto.encodeFlag($mediaUploadRichQuickReplies);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag vnameV2 = 19;
  var $vnameV2 = message.vnameV2;
  if ($vnameV2 !== undefined) {
    buffer.writeVarint32(154);
    var nested = proto.encodeFlag($vnameV2);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag videoPlaybackUrl = 20;
  var $videoPlaybackUrl = message.videoPlaybackUrl;
  if ($videoPlaybackUrl !== undefined) {
    buffer.writeVarint32(162);
    var nested = proto.encodeFlag($videoPlaybackUrl);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag statusRanking = 21;
  var $statusRanking = message.statusRanking;
  if ($statusRanking !== undefined) {
    buffer.writeVarint32(170);
    var nested = proto.encodeFlag($statusRanking);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag voipIndividualVideo = 22;
  var $voipIndividualVideo = message.voipIndividualVideo;
  if ($voipIndividualVideo !== undefined) {
    buffer.writeVarint32(178);
    var nested = proto.encodeFlag($voipIndividualVideo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag thirdPartyStickers = 23;
  var $thirdPartyStickers = message.thirdPartyStickers;
  if ($thirdPartyStickers !== undefined) {
    buffer.writeVarint32(186);
    var nested = proto.encodeFlag($thirdPartyStickers);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag frequentlyForwardedSetting = 24;
  var $frequentlyForwardedSetting = message.frequentlyForwardedSetting;
  if ($frequentlyForwardedSetting !== undefined) {
    buffer.writeVarint32(194);
    var nested = proto.encodeFlag($frequentlyForwardedSetting);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag groupsV4JoinPermission = 25;
  var $groupsV4JoinPermission = message.groupsV4JoinPermission;
  if ($groupsV4JoinPermission !== undefined) {
    buffer.writeVarint32(202);
    var nested = proto.encodeFlag($groupsV4JoinPermission);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag recentStickers = 26;
  var $recentStickers = message.recentStickers;
  if ($recentStickers !== undefined) {
    buffer.writeVarint32(210);
    var nested = proto.encodeFlag($recentStickers);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag catalog = 27;
  var $catalog = message.catalog;
  if ($catalog !== undefined) {
    buffer.writeVarint32(218);
    var nested = proto.encodeFlag($catalog);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag starredStickers = 28;
  var $starredStickers = message.starredStickers;
  if ($starredStickers !== undefined) {
    buffer.writeVarint32(226);
    var nested = proto.encodeFlag($starredStickers);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag voipGroupCall = 29;
  var $voipGroupCall = message.voipGroupCall;
  if ($voipGroupCall !== undefined) {
    buffer.writeVarint32(234);
    var nested = proto.encodeFlag($voipGroupCall);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag templateMessage = 30;
  var $templateMessage = message.templateMessage;
  if ($templateMessage !== undefined) {
    buffer.writeVarint32(242);
    var nested = proto.encodeFlag($templateMessage);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag templateMessageInteractivity = 31;
  var $templateMessageInteractivity = message.templateMessageInteractivity;
  if ($templateMessageInteractivity !== undefined) {
    buffer.writeVarint32(250);
    var nested = proto.encodeFlag($templateMessageInteractivity);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag ephemeralMessages = 32;
  var $ephemeralMessages = message.ephemeralMessages;
  if ($ephemeralMessages !== undefined) {
    buffer.writeVarint32(258);
    var nested = proto.encodeFlag($ephemeralMessages);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag e2ENotificationSync = 33;
  var $e2ENotificationSync = message.e2ENotificationSync;
  if ($e2ENotificationSync !== undefined) {
    buffer.writeVarint32(266);
    var nested = proto.encodeFlag($e2ENotificationSync);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag recentStickersV2 = 34;
  var $recentStickersV2 = message.recentStickersV2;
  if ($recentStickersV2 !== undefined) {
    buffer.writeVarint32(274);
    var nested = proto.encodeFlag($recentStickersV2);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag recentStickersV3 = 36;
  var $recentStickersV3 = message.recentStickersV3;
  if ($recentStickersV3 !== undefined) {
    buffer.writeVarint32(290);
    var nested = proto.encodeFlag($recentStickersV3);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag userNotice = 37;
  var $userNotice = message.userNotice;
  if ($userNotice !== undefined) {
    buffer.writeVarint32(298);
    var nested = proto.encodeFlag($userNotice);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag support = 39;
  var $support = message.support;
  if ($support !== undefined) {
    buffer.writeVarint32(314);
    var nested = proto.encodeFlag($support);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag groupUiiCleanup = 40;
  var $groupUiiCleanup = message.groupUiiCleanup;
  if ($groupUiiCleanup !== undefined) {
    buffer.writeVarint32(322);
    var nested = proto.encodeFlag($groupUiiCleanup);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag groupDogfoodingInternalOnly = 41;
  var $groupDogfoodingInternalOnly = message.groupDogfoodingInternalOnly;
  if ($groupDogfoodingInternalOnly !== undefined) {
    buffer.writeVarint32(330);
    var nested = proto.encodeFlag($groupDogfoodingInternalOnly);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag settingsSync = 42;
  var $settingsSync = message.settingsSync;
  if ($settingsSync !== undefined) {
    buffer.writeVarint32(338);
    var nested = proto.encodeFlag($settingsSync);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag archiveV2 = 43;
  var $archiveV2 = message.archiveV2;
  if ($archiveV2 !== undefined) {
    buffer.writeVarint32(346);
    var nested = proto.encodeFlag($archiveV2);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag ephemeralAllowGroupMembers = 44;
  var $ephemeralAllowGroupMembers = message.ephemeralAllowGroupMembers;
  if ($ephemeralAllowGroupMembers !== undefined) {
    buffer.writeVarint32(354);
    var nested = proto.encodeFlag($ephemeralAllowGroupMembers);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag ephemeral24HDuration = 45;
  var $ephemeral24HDuration = message.ephemeral24HDuration;
  if ($ephemeral24HDuration !== undefined) {
    buffer.writeVarint32(362);
    var nested = proto.encodeFlag($ephemeral24HDuration);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag mdForceUpgrade = 46;
  var $mdForceUpgrade = message.mdForceUpgrade;
  if ($mdForceUpgrade !== undefined) {
    buffer.writeVarint32(370);
    var nested = proto.encodeFlag($mdForceUpgrade);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag disappearingMode = 47;
  var $disappearingMode = message.disappearingMode;
  if ($disappearingMode !== undefined) {
    buffer.writeVarint32(378);
    var nested = proto.encodeFlag($disappearingMode);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag externalMdOptInAvailable = 48;
  var $externalMdOptInAvailable = message.externalMdOptInAvailable;
  if ($externalMdOptInAvailable !== undefined) {
    buffer.writeVarint32(386);
    var nested = proto.encodeFlag($externalMdOptInAvailable);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Flag noDeleteMessageTimeLimit = 49;
  var $noDeleteMessageTimeLimit = message.noDeleteMessageTimeLimit;
  if ($noDeleteMessageTimeLimit !== undefined) {
    buffer.writeVarint32(394);
    var nested = proto.encodeFlag($noDeleteMessageTimeLimit);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeWebFeatures = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional Flag labelsDisplay = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.labelsDisplay = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag voipIndividualOutgoing = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.voipIndividualOutgoing = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag groupsV3 = 3;
    case 3: {
      var limit = $pushTemporaryLength(buffer);
      message.groupsV3 = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag groupsV3Create = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.groupsV3Create = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag changeNumberV2 = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      message.changeNumberV2 = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag queryStatusV3Thumbnail = 6;
    case 6: {
      var limit = $pushTemporaryLength(buffer);
      message.queryStatusV3Thumbnail = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag liveLocations = 7;
    case 7: {
      var limit = $pushTemporaryLength(buffer);
      message.liveLocations = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag queryVname = 8;
    case 8: {
      var limit = $pushTemporaryLength(buffer);
      message.queryVname = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag voipIndividualIncoming = 9;
    case 9: {
      var limit = $pushTemporaryLength(buffer);
      message.voipIndividualIncoming = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag quickRepliesQuery = 10;
    case 10: {
      var limit = $pushTemporaryLength(buffer);
      message.quickRepliesQuery = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag payments = 11;
    case 11: {
      var limit = $pushTemporaryLength(buffer);
      message.payments = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag stickerPackQuery = 12;
    case 12: {
      var limit = $pushTemporaryLength(buffer);
      message.stickerPackQuery = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag liveLocationsFinal = 13;
    case 13: {
      var limit = $pushTemporaryLength(buffer);
      message.liveLocationsFinal = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag labelsEdit = 14;
    case 14: {
      var limit = $pushTemporaryLength(buffer);
      message.labelsEdit = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag mediaUpload = 15;
    case 15: {
      var limit = $pushTemporaryLength(buffer);
      message.mediaUpload = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag mediaUploadRichQuickReplies = 18;
    case 18: {
      var limit = $pushTemporaryLength(buffer);
      message.mediaUploadRichQuickReplies = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag vnameV2 = 19;
    case 19: {
      var limit = $pushTemporaryLength(buffer);
      message.vnameV2 = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag videoPlaybackUrl = 20;
    case 20: {
      var limit = $pushTemporaryLength(buffer);
      message.videoPlaybackUrl = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag statusRanking = 21;
    case 21: {
      var limit = $pushTemporaryLength(buffer);
      message.statusRanking = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag voipIndividualVideo = 22;
    case 22: {
      var limit = $pushTemporaryLength(buffer);
      message.voipIndividualVideo = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag thirdPartyStickers = 23;
    case 23: {
      var limit = $pushTemporaryLength(buffer);
      message.thirdPartyStickers = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag frequentlyForwardedSetting = 24;
    case 24: {
      var limit = $pushTemporaryLength(buffer);
      message.frequentlyForwardedSetting = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag groupsV4JoinPermission = 25;
    case 25: {
      var limit = $pushTemporaryLength(buffer);
      message.groupsV4JoinPermission = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag recentStickers = 26;
    case 26: {
      var limit = $pushTemporaryLength(buffer);
      message.recentStickers = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag catalog = 27;
    case 27: {
      var limit = $pushTemporaryLength(buffer);
      message.catalog = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag starredStickers = 28;
    case 28: {
      var limit = $pushTemporaryLength(buffer);
      message.starredStickers = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag voipGroupCall = 29;
    case 29: {
      var limit = $pushTemporaryLength(buffer);
      message.voipGroupCall = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag templateMessage = 30;
    case 30: {
      var limit = $pushTemporaryLength(buffer);
      message.templateMessage = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag templateMessageInteractivity = 31;
    case 31: {
      var limit = $pushTemporaryLength(buffer);
      message.templateMessageInteractivity = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag ephemeralMessages = 32;
    case 32: {
      var limit = $pushTemporaryLength(buffer);
      message.ephemeralMessages = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag e2ENotificationSync = 33;
    case 33: {
      var limit = $pushTemporaryLength(buffer);
      message.e2ENotificationSync = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag recentStickersV2 = 34;
    case 34: {
      var limit = $pushTemporaryLength(buffer);
      message.recentStickersV2 = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag recentStickersV3 = 36;
    case 36: {
      var limit = $pushTemporaryLength(buffer);
      message.recentStickersV3 = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag userNotice = 37;
    case 37: {
      var limit = $pushTemporaryLength(buffer);
      message.userNotice = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag support = 39;
    case 39: {
      var limit = $pushTemporaryLength(buffer);
      message.support = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag groupUiiCleanup = 40;
    case 40: {
      var limit = $pushTemporaryLength(buffer);
      message.groupUiiCleanup = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag groupDogfoodingInternalOnly = 41;
    case 41: {
      var limit = $pushTemporaryLength(buffer);
      message.groupDogfoodingInternalOnly = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag settingsSync = 42;
    case 42: {
      var limit = $pushTemporaryLength(buffer);
      message.settingsSync = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag archiveV2 = 43;
    case 43: {
      var limit = $pushTemporaryLength(buffer);
      message.archiveV2 = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag ephemeralAllowGroupMembers = 44;
    case 44: {
      var limit = $pushTemporaryLength(buffer);
      message.ephemeralAllowGroupMembers = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag ephemeral24HDuration = 45;
    case 45: {
      var limit = $pushTemporaryLength(buffer);
      message.ephemeral24HDuration = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag mdForceUpgrade = 46;
    case 46: {
      var limit = $pushTemporaryLength(buffer);
      message.mdForceUpgrade = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag disappearingMode = 47;
    case 47: {
      var limit = $pushTemporaryLength(buffer);
      message.disappearingMode = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag externalMdOptInAvailable = 48;
    case 48: {
      var limit = $pushTemporaryLength(buffer);
      message.externalMdOptInAvailable = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Flag noDeleteMessageTimeLimit = 49;
    case 49: {
      var limit = $pushTemporaryLength(buffer);
      message.noDeleteMessageTimeLimit = proto.decodeFlag(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

proto.encodeWebMessageInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // required MessageKey key = 1;
  var $key = message.key;
  if ($key !== undefined) {
    buffer.writeVarint32(10);
    var nested = proto.encodeMessageKey($key);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Message message = 2;
  var $message = message.message;
  if ($message !== undefined) {
    buffer.writeVarint32(18);
    var nested = proto.encodeMessage($message);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 messageTimestamp = 3;
  var $messageTimestamp = message.messageTimestamp;
  if ($messageTimestamp !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint64($coerceLong($messageTimestamp));
  }

  // optional Status status = 4;
  var $status = message.status;
  if ($status !== undefined) {
    buffer.writeVarint32(34);
    var nested = proto.encodeStatus($status);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string participant = 5;
  var $participant = message.participant;
  if ($participant !== undefined) {
    buffer.writeVarint32(42);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($participant), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint64 messageC2STimestamp = 6;
  var $messageC2STimestamp = message.messageC2STimestamp;
  if ($messageC2STimestamp !== undefined) {
    buffer.writeVarint32(48);
    buffer.writeVarint64($coerceLong($messageC2STimestamp));
  }

  // optional bool ignore = 16;
  var $ignore = message.ignore;
  if ($ignore !== undefined) {
    buffer.writeVarint32(128);
    buffer.writeByte($ignore ? 1 : 0);
  }

  // optional bool starred = 17;
  var $starred = message.starred;
  if ($starred !== undefined) {
    buffer.writeVarint32(136);
    buffer.writeByte($starred ? 1 : 0);
  }

  // optional bool broadcast = 18;
  var $broadcast = message.broadcast;
  if ($broadcast !== undefined) {
    buffer.writeVarint32(144);
    buffer.writeByte($broadcast ? 1 : 0);
  }

  // optional string pushName = 19;
  var $pushName = message.pushName;
  if ($pushName !== undefined) {
    buffer.writeVarint32(154);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($pushName), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bytes mediaCiphertextSha256 = 20;
  var $mediaCiphertextSha256 = message.mediaCiphertextSha256;
  if ($mediaCiphertextSha256 !== undefined) {
    buffer.writeVarint32(162);
    buffer.writeVarint32($mediaCiphertextSha256.length), buffer.append($mediaCiphertextSha256);
  }

  // optional bool multicast = 21;
  var $multicast = message.multicast;
  if ($multicast !== undefined) {
    buffer.writeVarint32(168);
    buffer.writeByte($multicast ? 1 : 0);
  }

  // optional bool urlText = 22;
  var $urlText = message.urlText;
  if ($urlText !== undefined) {
    buffer.writeVarint32(176);
    buffer.writeByte($urlText ? 1 : 0);
  }

  // optional bool urlNumber = 23;
  var $urlNumber = message.urlNumber;
  if ($urlNumber !== undefined) {
    buffer.writeVarint32(184);
    buffer.writeByte($urlNumber ? 1 : 0);
  }

  // optional StubType messageStubType = 24;
  var $messageStubType = message.messageStubType;
  if ($messageStubType !== undefined) {
    buffer.writeVarint32(194);
    var nested = proto.encodeStubType($messageStubType);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool clearMedia = 25;
  var $clearMedia = message.clearMedia;
  if ($clearMedia !== undefined) {
    buffer.writeVarint32(200);
    buffer.writeByte($clearMedia ? 1 : 0);
  }

  // repeated string messageStubParameters = 26;
  var array$messageStubParameters = message.messageStubParameters;
  if (array$messageStubParameters !== undefined) {
    for (var i = 0; i < array$messageStubParameters.length; i++) {
      var $messageStubParameters = array$messageStubParameters[i];
      var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
      buffer.writeVarint32(210);
      nested.writeUTF8String($messageStubParameters), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
    }
  }

  // optional uint32 duration = 27;
  var $duration = message.duration;
  if ($duration !== undefined) {
    buffer.writeVarint32(216);
    buffer.writeVarint32($duration);
  }

  // repeated string labels = 28;
  var array$labels = message.labels;
  if (array$labels !== undefined) {
    for (var i = 0; i < array$labels.length; i++) {
      var $labels = array$labels[i];
      var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
      buffer.writeVarint32(226);
      nested.writeUTF8String($labels), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
    }
  }

  // optional PaymentInfo paymentInfo = 29;
  var $paymentInfo = message.paymentInfo;
  if ($paymentInfo !== undefined) {
    buffer.writeVarint32(234);
    var nested = proto.encodePaymentInfo($paymentInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional Message.LiveLocationMessage finalLiveLocation = 30;
  var $finalLiveLocation = message.finalLiveLocation;
  if ($finalLiveLocation !== undefined) {
    buffer.writeVarint32(242);
    var nested = proto.encodeMessage.LiveLocationMessage($finalLiveLocation);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PaymentInfo quotedPaymentInfo = 31;
  var $quotedPaymentInfo = message.quotedPaymentInfo;
  if ($quotedPaymentInfo !== undefined) {
    buffer.writeVarint32(250);
    var nested = proto.encodePaymentInfo($quotedPaymentInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 ephemeralStartTimestamp = 32;
  var $ephemeralStartTimestamp = message.ephemeralStartTimestamp;
  if ($ephemeralStartTimestamp !== undefined) {
    buffer.writeVarint32(256);
    buffer.writeVarint64($coerceLong($ephemeralStartTimestamp));
  }

  // optional uint32 ephemeralDuration = 33;
  var $ephemeralDuration = message.ephemeralDuration;
  if ($ephemeralDuration !== undefined) {
    buffer.writeVarint32(264);
    buffer.writeVarint32($ephemeralDuration);
  }

  // optional bool ephemeralOffToOn = 34;
  var $ephemeralOffToOn = message.ephemeralOffToOn;
  if ($ephemeralOffToOn !== undefined) {
    buffer.writeVarint32(272);
    buffer.writeByte($ephemeralOffToOn ? 1 : 0);
  }

  // optional bool ephemeralOutOfSync = 35;
  var $ephemeralOutOfSync = message.ephemeralOutOfSync;
  if ($ephemeralOutOfSync !== undefined) {
    buffer.writeVarint32(280);
    buffer.writeByte($ephemeralOutOfSync ? 1 : 0);
  }

  // optional BizPrivacyStatus bizPrivacyStatus = 36;
  var $bizPrivacyStatus = message.bizPrivacyStatus;
  if ($bizPrivacyStatus !== undefined) {
    buffer.writeVarint32(290);
    var nested = proto.encodeBizPrivacyStatus($bizPrivacyStatus);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string verifiedBizName = 37;
  var $verifiedBizName = message.verifiedBizName;
  if ($verifiedBizName !== undefined) {
    buffer.writeVarint32(298);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($verifiedBizName), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional MediaData mediaData = 38;
  var $mediaData = message.mediaData;
  if ($mediaData !== undefined) {
    buffer.writeVarint32(306);
    var nested = proto.encodeMediaData($mediaData);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PhotoChange photoChange = 39;
  var $photoChange = message.photoChange;
  if ($photoChange !== undefined) {
    buffer.writeVarint32(314);
    var nested = proto.encodePhotoChange($photoChange);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated UserReceipt userReceipt = 40;
  var array$userReceipt = message.userReceipt;
  if (array$userReceipt !== undefined) {
    for (var i = 0; i < array$userReceipt.length; i++) {
      var $userReceipt = array$userReceipt[i];
      var nested = proto.encodeUserReceipt($userReceipt);
      buffer.writeVarint32(322);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // repeated Reaction reactions = 41;
  var array$reactions = message.reactions;
  if (array$reactions !== undefined) {
    for (var i = 0; i < array$reactions.length; i++) {
      var $reactions = array$reactions[i];
      var nested = proto.encodeReaction($reactions);
      buffer.writeVarint32(330);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional MediaData quotedStickerData = 42;
  var $quotedStickerData = message.quotedStickerData;
  if ($quotedStickerData !== undefined) {
    buffer.writeVarint32(338);
    var nested = proto.encodeMediaData($quotedStickerData);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bytes futureproofData = 43;
  var $futureproofData = message.futureproofData;
  if ($futureproofData !== undefined) {
    buffer.writeVarint32(346);
    buffer.writeVarint32($futureproofData.length), buffer.append($futureproofData);
  }

  // optional StatusPSA statusPsa = 44;
  var $statusPsa = message.statusPsa;
  if ($statusPsa !== undefined) {
    buffer.writeVarint32(354);
    var nested = proto.encodeStatusPSA($statusPsa);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated PollUpdate pollUpdates = 45;
  var array$pollUpdates = message.pollUpdates;
  if (array$pollUpdates !== undefined) {
    for (var i = 0; i < array$pollUpdates.length; i++) {
      var $pollUpdates = array$pollUpdates[i];
      var nested = proto.encodePollUpdate($pollUpdates);
      buffer.writeVarint32(362);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional PollAdditionalMetadata pollAdditionalMetadata = 46;
  var $pollAdditionalMetadata = message.pollAdditionalMetadata;
  if ($pollAdditionalMetadata !== undefined) {
    buffer.writeVarint32(370);
    var nested = proto.encodePollAdditionalMetadata($pollAdditionalMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string agentId = 47;
  var $agentId = message.agentId;
  if ($agentId !== undefined) {
    buffer.writeVarint32(378);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($agentId), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional bool statusAlreadyViewed = 48;
  var $statusAlreadyViewed = message.statusAlreadyViewed;
  if ($statusAlreadyViewed !== undefined) {
    buffer.writeVarint32(384);
    buffer.writeByte($statusAlreadyViewed ? 1 : 0);
  }

  // optional bytes messageSecret = 49;
  var $messageSecret = message.messageSecret;
  if ($messageSecret !== undefined) {
    buffer.writeVarint32(394);
    buffer.writeVarint32($messageSecret.length), buffer.append($messageSecret);
  }

  // optional KeepInChat keepInChat = 50;
  var $keepInChat = message.keepInChat;
  if ($keepInChat !== undefined) {
    buffer.writeVarint32(402);
    var nested = proto.encodeKeepInChat($keepInChat);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional string originalSelfAuthorUserJidString = 51;
  var $originalSelfAuthorUserJidString = message.originalSelfAuthorUserJidString;
  if ($originalSelfAuthorUserJidString !== undefined) {
    buffer.writeVarint32(410);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($originalSelfAuthorUserJidString), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional uint64 revokeMessageTimestamp = 52;
  var $revokeMessageTimestamp = message.revokeMessageTimestamp;
  if ($revokeMessageTimestamp !== undefined) {
    buffer.writeVarint32(416);
    buffer.writeVarint64($coerceLong($revokeMessageTimestamp));
  }

  // optional PinInChat pinInChat = 54;
  var $pinInChat = message.pinInChat;
  if ($pinInChat !== undefined) {
    buffer.writeVarint32(434);
    var nested = proto.encodePinInChat($pinInChat);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional PremiumMessageInfo premiumMessageInfo = 55;
  var $premiumMessageInfo = message.premiumMessageInfo;
  if ($premiumMessageInfo !== undefined) {
    buffer.writeVarint32(442);
    var nested = proto.encodePremiumMessageInfo($premiumMessageInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional bool is1PBizBotMessage = 56;
  var $is1PBizBotMessage = message.is1PBizBotMessage;
  if ($is1PBizBotMessage !== undefined) {
    buffer.writeVarint32(448);
    buffer.writeByte($is1PBizBotMessage ? 1 : 0);
  }

  // optional bool isGroupHistoryMessage = 57;
  var $isGroupHistoryMessage = message.isGroupHistoryMessage;
  if ($isGroupHistoryMessage !== undefined) {
    buffer.writeVarint32(456);
    buffer.writeByte($isGroupHistoryMessage ? 1 : 0);
  }

  // optional string botMessageInvokerJid = 58;
  var $botMessageInvokerJid = message.botMessageInvokerJid;
  if ($botMessageInvokerJid !== undefined) {
    buffer.writeVarint32(466);
    var nested = new ByteBuffer(undefined, /* isLittleEndian */ true);
    nested.writeUTF8String($botMessageInvokerJid), buffer.writeVarint32(nested.flip().limit), buffer.append(nested);
  }

  // optional CommentMetadata commentMetadata = 59;
  var $commentMetadata = message.commentMetadata;
  if ($commentMetadata !== undefined) {
    buffer.writeVarint32(474);
    var nested = proto.encodeCommentMetadata($commentMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // repeated EventResponse eventResponses = 61;
  var array$eventResponses = message.eventResponses;
  if (array$eventResponses !== undefined) {
    for (var i = 0; i < array$eventResponses.length; i++) {
      var $eventResponses = array$eventResponses[i];
      var nested = proto.encodeEventResponse($eventResponses);
      buffer.writeVarint32(490);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  // optional ReportingTokenInfo reportingTokenInfo = 62;
  var $reportingTokenInfo = message.reportingTokenInfo;
  if ($reportingTokenInfo !== undefined) {
    buffer.writeVarint32(498);
    var nested = proto.encodeReportingTokenInfo($reportingTokenInfo);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  // optional uint64 newsletterServerId = 63;
  var $newsletterServerId = message.newsletterServerId;
  if ($newsletterServerId !== undefined) {
    buffer.writeVarint32(504);
    buffer.writeVarint64($coerceLong($newsletterServerId));
  }

  // optional EventAdditionalMetadata eventAdditionalMetadata = 64;
  var $eventAdditionalMetadata = message.eventAdditionalMetadata;
  if ($eventAdditionalMetadata !== undefined) {
    buffer.writeVarint32(514);
    var nested = proto.encodeEventAdditionalMetadata($eventAdditionalMetadata);
    buffer.writeVarint32(nested.byteLength), buffer.append(nested);
  }

  return buffer.flip().toBuffer();
};

proto.decodeWebMessageInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // required MessageKey key = 1;
    case 1: {
      var limit = $pushTemporaryLength(buffer);
      message.key = proto.decodeMessageKey(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Message message = 2;
    case 2: {
      var limit = $pushTemporaryLength(buffer);
      message.message = proto.decodeMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 messageTimestamp = 3;
    case 3: {
      message.messageTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional Status status = 4;
    case 4: {
      var limit = $pushTemporaryLength(buffer);
      message.status = proto.decodeStatus(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string participant = 5;
    case 5: {
      message.participant = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint64 messageC2STimestamp = 6;
    case 6: {
      message.messageC2STimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional bool ignore = 16;
    case 16: {
      message.ignore = !!buffer.readByte();
      break;
    }

    // optional bool starred = 17;
    case 17: {
      message.starred = !!buffer.readByte();
      break;
    }

    // optional bool broadcast = 18;
    case 18: {
      message.broadcast = !!buffer.readByte();
      break;
    }

    // optional string pushName = 19;
    case 19: {
      message.pushName = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bytes mediaCiphertextSha256 = 20;
    case 20: {
      message.mediaCiphertextSha256 = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional bool multicast = 21;
    case 21: {
      message.multicast = !!buffer.readByte();
      break;
    }

    // optional bool urlText = 22;
    case 22: {
      message.urlText = !!buffer.readByte();
      break;
    }

    // optional bool urlNumber = 23;
    case 23: {
      message.urlNumber = !!buffer.readByte();
      break;
    }

    // optional StubType messageStubType = 24;
    case 24: {
      var limit = $pushTemporaryLength(buffer);
      message.messageStubType = proto.decodeStubType(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool clearMedia = 25;
    case 25: {
      message.clearMedia = !!buffer.readByte();
      break;
    }

    // repeated string messageStubParameters = 26;
    case 26: {
      var values = message.messageStubParameters || (message.messageStubParameters = []);
      values.push(buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES));
      break;
    }

    // optional uint32 duration = 27;
    case 27: {
      message.duration = buffer.readVarint32() >>> 0;
      break;
    }

    // repeated string labels = 28;
    case 28: {
      var values = message.labels || (message.labels = []);
      values.push(buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES));
      break;
    }

    // optional PaymentInfo paymentInfo = 29;
    case 29: {
      var limit = $pushTemporaryLength(buffer);
      message.paymentInfo = proto.decodePaymentInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional Message.LiveLocationMessage finalLiveLocation = 30;
    case 30: {
      var limit = $pushTemporaryLength(buffer);
      message.finalLiveLocation = proto.decodeMessage.LiveLocationMessage(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PaymentInfo quotedPaymentInfo = 31;
    case 31: {
      var limit = $pushTemporaryLength(buffer);
      message.quotedPaymentInfo = proto.decodePaymentInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 ephemeralStartTimestamp = 32;
    case 32: {
      message.ephemeralStartTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint32 ephemeralDuration = 33;
    case 33: {
      message.ephemeralDuration = buffer.readVarint32() >>> 0;
      break;
    }

    // optional bool ephemeralOffToOn = 34;
    case 34: {
      message.ephemeralOffToOn = !!buffer.readByte();
      break;
    }

    // optional bool ephemeralOutOfSync = 35;
    case 35: {
      message.ephemeralOutOfSync = !!buffer.readByte();
      break;
    }

    // optional BizPrivacyStatus bizPrivacyStatus = 36;
    case 36: {
      var limit = $pushTemporaryLength(buffer);
      message.bizPrivacyStatus = proto.decodeBizPrivacyStatus(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string verifiedBizName = 37;
    case 37: {
      message.verifiedBizName = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional MediaData mediaData = 38;
    case 38: {
      var limit = $pushTemporaryLength(buffer);
      message.mediaData = proto.decodeMediaData(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PhotoChange photoChange = 39;
    case 39: {
      var limit = $pushTemporaryLength(buffer);
      message.photoChange = proto.decodePhotoChange(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated UserReceipt userReceipt = 40;
    case 40: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.userReceipt || (message.userReceipt = []);
      values.push(proto.decodeUserReceipt(buffer));
      buffer.limit = limit;
      break;
    }

    // repeated Reaction reactions = 41;
    case 41: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.reactions || (message.reactions = []);
      values.push(proto.decodeReaction(buffer));
      buffer.limit = limit;
      break;
    }

    // optional MediaData quotedStickerData = 42;
    case 42: {
      var limit = $pushTemporaryLength(buffer);
      message.quotedStickerData = proto.decodeMediaData(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bytes futureproofData = 43;
    case 43: {
      message.futureproofData = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional StatusPSA statusPsa = 44;
    case 44: {
      var limit = $pushTemporaryLength(buffer);
      message.statusPsa = proto.decodeStatusPSA(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated PollUpdate pollUpdates = 45;
    case 45: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.pollUpdates || (message.pollUpdates = []);
      values.push(proto.decodePollUpdate(buffer));
      buffer.limit = limit;
      break;
    }

    // optional PollAdditionalMetadata pollAdditionalMetadata = 46;
    case 46: {
      var limit = $pushTemporaryLength(buffer);
      message.pollAdditionalMetadata = proto.decodePollAdditionalMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string agentId = 47;
    case 47: {
      message.agentId = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional bool statusAlreadyViewed = 48;
    case 48: {
      message.statusAlreadyViewed = !!buffer.readByte();
      break;
    }

    // optional bytes messageSecret = 49;
    case 49: {
      message.messageSecret = buffer.readBytes(buffer.readVarint32()).toBuffer();
      break;
    }

    // optional KeepInChat keepInChat = 50;
    case 50: {
      var limit = $pushTemporaryLength(buffer);
      message.keepInChat = proto.decodeKeepInChat(buffer);
      buffer.limit = limit;
      break;
    }

    // optional string originalSelfAuthorUserJidString = 51;
    case 51: {
      message.originalSelfAuthorUserJidString = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional uint64 revokeMessageTimestamp = 52;
    case 52: {
      message.revokeMessageTimestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional PinInChat pinInChat = 54;
    case 54: {
      var limit = $pushTemporaryLength(buffer);
      message.pinInChat = proto.decodePinInChat(buffer);
      buffer.limit = limit;
      break;
    }

    // optional PremiumMessageInfo premiumMessageInfo = 55;
    case 55: {
      var limit = $pushTemporaryLength(buffer);
      message.premiumMessageInfo = proto.decodePremiumMessageInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional bool is1PBizBotMessage = 56;
    case 56: {
      message.is1PBizBotMessage = !!buffer.readByte();
      break;
    }

    // optional bool isGroupHistoryMessage = 57;
    case 57: {
      message.isGroupHistoryMessage = !!buffer.readByte();
      break;
    }

    // optional string botMessageInvokerJid = 58;
    case 58: {
      message.botMessageInvokerJid = buffer.readUTF8String(buffer.readVarint32(), ByteBuffer.METRICS_BYTES);
      break;
    }

    // optional CommentMetadata commentMetadata = 59;
    case 59: {
      var limit = $pushTemporaryLength(buffer);
      message.commentMetadata = proto.decodeCommentMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    // repeated EventResponse eventResponses = 61;
    case 61: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.eventResponses || (message.eventResponses = []);
      values.push(proto.decodeEventResponse(buffer));
      buffer.limit = limit;
      break;
    }

    // optional ReportingTokenInfo reportingTokenInfo = 62;
    case 62: {
      var limit = $pushTemporaryLength(buffer);
      message.reportingTokenInfo = proto.decodeReportingTokenInfo(buffer);
      buffer.limit = limit;
      break;
    }

    // optional uint64 newsletterServerId = 63;
    case 63: {
      message.newsletterServerId = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional EventAdditionalMetadata eventAdditionalMetadata = 64;
    case 64: {
      var limit = $pushTemporaryLength(buffer);
      message.eventAdditionalMetadata = proto.decodeEventAdditionalMetadata(buffer);
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  if (message.key === undefined)
    throw new Error("Missing required field: key");

  return message;
};

proto.encodeWebNotificationsInfo = function(message) {
  var buffer = new ByteBuffer(undefined, /* isLittleEndian */ true);

  // optional uint64 timestamp = 2;
  var $timestamp = message.timestamp;
  if ($timestamp !== undefined) {
    buffer.writeVarint32(16);
    buffer.writeVarint64($coerceLong($timestamp));
  }

  // optional uint32 unreadChats = 3;
  var $unreadChats = message.unreadChats;
  if ($unreadChats !== undefined) {
    buffer.writeVarint32(24);
    buffer.writeVarint32($unreadChats);
  }

  // optional uint32 notifyMessageCount = 4;
  var $notifyMessageCount = message.notifyMessageCount;
  if ($notifyMessageCount !== undefined) {
    buffer.writeVarint32(32);
    buffer.writeVarint32($notifyMessageCount);
  }

  // repeated WebMessageInfo notifyMessages = 5;
  var array$notifyMessages = message.notifyMessages;
  if (array$notifyMessages !== undefined) {
    for (var i = 0; i < array$notifyMessages.length; i++) {
      var $notifyMessages = array$notifyMessages[i];
      var nested = proto.encodeWebMessageInfo($notifyMessages);
      buffer.writeVarint32(42);
      buffer.writeVarint32(nested.byteLength), buffer.append(nested);
    }
  }

  return buffer.flip().toBuffer();
};

proto.decodeWebNotificationsInfo = function(binary) {
  var message = {};
  var buffer = binary instanceof ByteBuffer ? binary : ByteBuffer.wrap(binary, /* isLittleEndian */ true);

  end_of_message: while (buffer.remaining() > 0) {
    var tag = buffer.readVarint32();

    switch (tag >>> 3) {
    case 0:
      break end_of_message;

    // optional uint64 timestamp = 2;
    case 2: {
      message.timestamp = buffer.readVarint64().toUnsigned();
      break;
    }

    // optional uint32 unreadChats = 3;
    case 3: {
      message.unreadChats = buffer.readVarint32() >>> 0;
      break;
    }

    // optional uint32 notifyMessageCount = 4;
    case 4: {
      message.notifyMessageCount = buffer.readVarint32() >>> 0;
      break;
    }

    // repeated WebMessageInfo notifyMessages = 5;
    case 5: {
      var limit = $pushTemporaryLength(buffer);
      var values = message.notifyMessages || (message.notifyMessages = []);
      values.push(proto.decodeWebMessageInfo(buffer));
      buffer.limit = limit;
      break;
    }

    default:
      $skipUnknownField(buffer, tag & 7);
    }
  }

  return message;
};

})();
