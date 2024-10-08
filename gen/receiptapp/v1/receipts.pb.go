// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.34.2
// 	protoc        (unknown)
// source: receiptapp/v1/receipts.proto

package receiptappv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type ListReceiptsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ListReceiptsRequest) Reset() {
	*x = ListReceiptsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_receiptapp_v1_receipts_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListReceiptsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListReceiptsRequest) ProtoMessage() {}

func (x *ListReceiptsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_receiptapp_v1_receipts_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListReceiptsRequest.ProtoReflect.Descriptor instead.
func (*ListReceiptsRequest) Descriptor() ([]byte, []int) {
	return file_receiptapp_v1_receipts_proto_rawDescGZIP(), []int{0}
}

type ListReceiptsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Receipts []*Receipt `protobuf:"bytes,1,rep,name=receipts,proto3" json:"receipts,omitempty"`
}

func (x *ListReceiptsResponse) Reset() {
	*x = ListReceiptsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_receiptapp_v1_receipts_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ListReceiptsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ListReceiptsResponse) ProtoMessage() {}

func (x *ListReceiptsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_receiptapp_v1_receipts_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ListReceiptsResponse.ProtoReflect.Descriptor instead.
func (*ListReceiptsResponse) Descriptor() ([]byte, []int) {
	return file_receiptapp_v1_receipts_proto_rawDescGZIP(), []int{1}
}

func (x *ListReceiptsResponse) GetReceipts() []*Receipt {
	if x != nil {
		return x.Receipts
	}
	return nil
}

type Receipt struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Id           int64   `protobuf:"varint,1,opt,name=id,proto3" json:"id,omitempty"`
	MerchantName string  `protobuf:"bytes,2,opt,name=merchant_name,json=merchantName,proto3" json:"merchant_name,omitempty"`
	Date         string  `protobuf:"bytes,3,opt,name=date,proto3" json:"date,omitempty"`
	TotalAmount  float32 `protobuf:"fixed32,4,opt,name=total_amount,json=totalAmount,proto3" json:"total_amount,omitempty"`
}

func (x *Receipt) Reset() {
	*x = Receipt{}
	if protoimpl.UnsafeEnabled {
		mi := &file_receiptapp_v1_receipts_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Receipt) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Receipt) ProtoMessage() {}

func (x *Receipt) ProtoReflect() protoreflect.Message {
	mi := &file_receiptapp_v1_receipts_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Receipt.ProtoReflect.Descriptor instead.
func (*Receipt) Descriptor() ([]byte, []int) {
	return file_receiptapp_v1_receipts_proto_rawDescGZIP(), []int{2}
}

func (x *Receipt) GetId() int64 {
	if x != nil {
		return x.Id
	}
	return 0
}

func (x *Receipt) GetMerchantName() string {
	if x != nil {
		return x.MerchantName
	}
	return ""
}

func (x *Receipt) GetDate() string {
	if x != nil {
		return x.Date
	}
	return ""
}

func (x *Receipt) GetTotalAmount() float32 {
	if x != nil {
		return x.TotalAmount
	}
	return 0
}

type GetReceiptDownloadURLRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	ReceiptId int64 `protobuf:"varint,1,opt,name=receipt_id,json=receiptId,proto3" json:"receipt_id,omitempty"`
}

func (x *GetReceiptDownloadURLRequest) Reset() {
	*x = GetReceiptDownloadURLRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_receiptapp_v1_receipts_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetReceiptDownloadURLRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetReceiptDownloadURLRequest) ProtoMessage() {}

func (x *GetReceiptDownloadURLRequest) ProtoReflect() protoreflect.Message {
	mi := &file_receiptapp_v1_receipts_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetReceiptDownloadURLRequest.ProtoReflect.Descriptor instead.
func (*GetReceiptDownloadURLRequest) Descriptor() ([]byte, []int) {
	return file_receiptapp_v1_receipts_proto_rawDescGZIP(), []int{3}
}

func (x *GetReceiptDownloadURLRequest) GetReceiptId() int64 {
	if x != nil {
		return x.ReceiptId
	}
	return 0
}

type GetReceiptDownloadURLResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	DownloadUrl string `protobuf:"bytes,1,opt,name=download_url,json=downloadUrl,proto3" json:"download_url,omitempty"`
}

func (x *GetReceiptDownloadURLResponse) Reset() {
	*x = GetReceiptDownloadURLResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_receiptapp_v1_receipts_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetReceiptDownloadURLResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetReceiptDownloadURLResponse) ProtoMessage() {}

func (x *GetReceiptDownloadURLResponse) ProtoReflect() protoreflect.Message {
	mi := &file_receiptapp_v1_receipts_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetReceiptDownloadURLResponse.ProtoReflect.Descriptor instead.
func (*GetReceiptDownloadURLResponse) Descriptor() ([]byte, []int) {
	return file_receiptapp_v1_receipts_proto_rawDescGZIP(), []int{4}
}

func (x *GetReceiptDownloadURLResponse) GetDownloadUrl() string {
	if x != nil {
		return x.DownloadUrl
	}
	return ""
}

var File_receiptapp_v1_receipts_proto protoreflect.FileDescriptor

var file_receiptapp_v1_receipts_proto_rawDesc = []byte{
	0x0a, 0x1c, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70, 0x2f, 0x76, 0x31, 0x2f,
	0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0d,
	0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70, 0x2e, 0x76, 0x31, 0x22, 0x15, 0x0a,
	0x13, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x22, 0x4a, 0x0a, 0x14, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x63, 0x65,
	0x69, 0x70, 0x74, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x32, 0x0a, 0x08,
	0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73, 0x18, 0x01, 0x20, 0x03, 0x28, 0x0b, 0x32, 0x16,
	0x2e, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70, 0x2e, 0x76, 0x31, 0x2e, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x52, 0x08, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73,
	0x22, 0x75, 0x0a, 0x07, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x12, 0x0e, 0x0a, 0x02, 0x69,
	0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x02, 0x69, 0x64, 0x12, 0x23, 0x0a, 0x0d, 0x6d,
	0x65, 0x72, 0x63, 0x68, 0x61, 0x6e, 0x74, 0x5f, 0x6e, 0x61, 0x6d, 0x65, 0x18, 0x02, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x0c, 0x6d, 0x65, 0x72, 0x63, 0x68, 0x61, 0x6e, 0x74, 0x4e, 0x61, 0x6d, 0x65,
	0x12, 0x12, 0x0a, 0x04, 0x64, 0x61, 0x74, 0x65, 0x18, 0x03, 0x20, 0x01, 0x28, 0x09, 0x52, 0x04,
	0x64, 0x61, 0x74, 0x65, 0x12, 0x21, 0x0a, 0x0c, 0x74, 0x6f, 0x74, 0x61, 0x6c, 0x5f, 0x61, 0x6d,
	0x6f, 0x75, 0x6e, 0x74, 0x18, 0x04, 0x20, 0x01, 0x28, 0x02, 0x52, 0x0b, 0x74, 0x6f, 0x74, 0x61,
	0x6c, 0x41, 0x6d, 0x6f, 0x75, 0x6e, 0x74, 0x22, 0x3d, 0x0a, 0x1c, 0x47, 0x65, 0x74, 0x52, 0x65,
	0x63, 0x65, 0x69, 0x70, 0x74, 0x44, 0x6f, 0x77, 0x6e, 0x6c, 0x6f, 0x61, 0x64, 0x55, 0x52, 0x4c,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x1d, 0x0a, 0x0a, 0x72, 0x65, 0x63, 0x65, 0x69,
	0x70, 0x74, 0x5f, 0x69, 0x64, 0x18, 0x01, 0x20, 0x01, 0x28, 0x03, 0x52, 0x09, 0x72, 0x65, 0x63,
	0x65, 0x69, 0x70, 0x74, 0x49, 0x64, 0x22, 0x42, 0x0a, 0x1d, 0x47, 0x65, 0x74, 0x52, 0x65, 0x63,
	0x65, 0x69, 0x70, 0x74, 0x44, 0x6f, 0x77, 0x6e, 0x6c, 0x6f, 0x61, 0x64, 0x55, 0x52, 0x4c, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x21, 0x0a, 0x0c, 0x64, 0x6f, 0x77, 0x6e, 0x6c,
	0x6f, 0x61, 0x64, 0x5f, 0x75, 0x72, 0x6c, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x52, 0x0b, 0x64,
	0x6f, 0x77, 0x6e, 0x6c, 0x6f, 0x61, 0x64, 0x55, 0x72, 0x6c, 0x32, 0xe1, 0x01, 0x0a, 0x0e, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x59, 0x0a,
	0x0c, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73, 0x12, 0x22, 0x2e,
	0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70, 0x2e, 0x76, 0x31, 0x2e, 0x4c, 0x69,
	0x73, 0x74, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x1a, 0x23, 0x2e, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70, 0x2e, 0x76,
	0x31, 0x2e, 0x4c, 0x69, 0x73, 0x74, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x74, 0x0a, 0x15, 0x47, 0x65, 0x74, 0x52,
	0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x44, 0x6f, 0x77, 0x6e, 0x6c, 0x6f, 0x61, 0x64, 0x55, 0x52,
	0x4c, 0x12, 0x2b, 0x2e, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70, 0x2e, 0x76,
	0x31, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x44, 0x6f, 0x77, 0x6e,
	0x6c, 0x6f, 0x61, 0x64, 0x55, 0x52, 0x4c, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x2c,
	0x2e, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70, 0x2e, 0x76, 0x31, 0x2e, 0x47,
	0x65, 0x74, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x44, 0x6f, 0x77, 0x6e, 0x6c, 0x6f, 0x61,
	0x64, 0x55, 0x52, 0x4c, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x42, 0xc4,
	0x01, 0x0a, 0x11, 0x63, 0x6f, 0x6d, 0x2e, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70,
	0x70, 0x2e, 0x76, 0x31, 0x42, 0x0d, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x73, 0x50, 0x72,
	0x6f, 0x74, 0x6f, 0x50, 0x01, 0x5a, 0x4b, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f,
	0x6d, 0x2f, 0x63, 0x68, 0x72, 0x6e, 0x6f, 0x72, 0x6d, 0x2f, 0x62, 0x75, 0x69, 0x6c, 0x64, 0x2d,
	0x79, 0x6f, 0x75, 0x72, 0x2d, 0x6f, 0x77, 0x6e, 0x2d, 0x63, 0x6c, 0x6f, 0x75, 0x64, 0x74, 0x72,
	0x61, 0x69, 0x6c, 0x2f, 0x67, 0x65, 0x6e, 0x2f, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61,
	0x70, 0x70, 0x2f, 0x76, 0x31, 0x3b, 0x72, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70, 0x70,
	0x76, 0x31, 0xa2, 0x02, 0x03, 0x52, 0x58, 0x58, 0xaa, 0x02, 0x0d, 0x52, 0x65, 0x63, 0x65, 0x69,
	0x70, 0x74, 0x61, 0x70, 0x70, 0x2e, 0x56, 0x31, 0xca, 0x02, 0x0d, 0x52, 0x65, 0x63, 0x65, 0x69,
	0x70, 0x74, 0x61, 0x70, 0x70, 0x5c, 0x56, 0x31, 0xe2, 0x02, 0x19, 0x52, 0x65, 0x63, 0x65, 0x69,
	0x70, 0x74, 0x61, 0x70, 0x70, 0x5c, 0x56, 0x31, 0x5c, 0x47, 0x50, 0x42, 0x4d, 0x65, 0x74, 0x61,
	0x64, 0x61, 0x74, 0x61, 0xea, 0x02, 0x0e, 0x52, 0x65, 0x63, 0x65, 0x69, 0x70, 0x74, 0x61, 0x70,
	0x70, 0x3a, 0x3a, 0x56, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_receiptapp_v1_receipts_proto_rawDescOnce sync.Once
	file_receiptapp_v1_receipts_proto_rawDescData = file_receiptapp_v1_receipts_proto_rawDesc
)

func file_receiptapp_v1_receipts_proto_rawDescGZIP() []byte {
	file_receiptapp_v1_receipts_proto_rawDescOnce.Do(func() {
		file_receiptapp_v1_receipts_proto_rawDescData = protoimpl.X.CompressGZIP(file_receiptapp_v1_receipts_proto_rawDescData)
	})
	return file_receiptapp_v1_receipts_proto_rawDescData
}

var file_receiptapp_v1_receipts_proto_msgTypes = make([]protoimpl.MessageInfo, 5)
var file_receiptapp_v1_receipts_proto_goTypes = []any{
	(*ListReceiptsRequest)(nil),           // 0: receiptapp.v1.ListReceiptsRequest
	(*ListReceiptsResponse)(nil),          // 1: receiptapp.v1.ListReceiptsResponse
	(*Receipt)(nil),                       // 2: receiptapp.v1.Receipt
	(*GetReceiptDownloadURLRequest)(nil),  // 3: receiptapp.v1.GetReceiptDownloadURLRequest
	(*GetReceiptDownloadURLResponse)(nil), // 4: receiptapp.v1.GetReceiptDownloadURLResponse
}
var file_receiptapp_v1_receipts_proto_depIdxs = []int32{
	2, // 0: receiptapp.v1.ListReceiptsResponse.receipts:type_name -> receiptapp.v1.Receipt
	0, // 1: receiptapp.v1.ReceiptService.ListReceipts:input_type -> receiptapp.v1.ListReceiptsRequest
	3, // 2: receiptapp.v1.ReceiptService.GetReceiptDownloadURL:input_type -> receiptapp.v1.GetReceiptDownloadURLRequest
	1, // 3: receiptapp.v1.ReceiptService.ListReceipts:output_type -> receiptapp.v1.ListReceiptsResponse
	4, // 4: receiptapp.v1.ReceiptService.GetReceiptDownloadURL:output_type -> receiptapp.v1.GetReceiptDownloadURLResponse
	3, // [3:5] is the sub-list for method output_type
	1, // [1:3] is the sub-list for method input_type
	1, // [1:1] is the sub-list for extension type_name
	1, // [1:1] is the sub-list for extension extendee
	0, // [0:1] is the sub-list for field type_name
}

func init() { file_receiptapp_v1_receipts_proto_init() }
func file_receiptapp_v1_receipts_proto_init() {
	if File_receiptapp_v1_receipts_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_receiptapp_v1_receipts_proto_msgTypes[0].Exporter = func(v any, i int) any {
			switch v := v.(*ListReceiptsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_receiptapp_v1_receipts_proto_msgTypes[1].Exporter = func(v any, i int) any {
			switch v := v.(*ListReceiptsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_receiptapp_v1_receipts_proto_msgTypes[2].Exporter = func(v any, i int) any {
			switch v := v.(*Receipt); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_receiptapp_v1_receipts_proto_msgTypes[3].Exporter = func(v any, i int) any {
			switch v := v.(*GetReceiptDownloadURLRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_receiptapp_v1_receipts_proto_msgTypes[4].Exporter = func(v any, i int) any {
			switch v := v.(*GetReceiptDownloadURLResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_receiptapp_v1_receipts_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   5,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_receiptapp_v1_receipts_proto_goTypes,
		DependencyIndexes: file_receiptapp_v1_receipts_proto_depIdxs,
		MessageInfos:      file_receiptapp_v1_receipts_proto_msgTypes,
	}.Build()
	File_receiptapp_v1_receipts_proto = out.File
	file_receiptapp_v1_receipts_proto_rawDesc = nil
	file_receiptapp_v1_receipts_proto_goTypes = nil
	file_receiptapp_v1_receipts_proto_depIdxs = nil
}
