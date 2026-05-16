package core

type WorldWondersError struct {
	IsWorldWondersError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWorldWondersError(code string, msg string, ctx *Context) *WorldWondersError {
	return &WorldWondersError{
		IsWorldWondersError: true,
		Sdk:              "WorldWonders",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WorldWondersError) Error() string {
	return e.Msg
}
