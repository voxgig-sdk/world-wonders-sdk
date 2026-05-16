<?php
declare(strict_types=1);

// WorldWonders SDK base feature

class WorldWondersBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(WorldWondersContext $ctx, array $options): void {}
    public function PostConstruct(WorldWondersContext $ctx): void {}
    public function PostConstructEntity(WorldWondersContext $ctx): void {}
    public function SetData(WorldWondersContext $ctx): void {}
    public function GetData(WorldWondersContext $ctx): void {}
    public function GetMatch(WorldWondersContext $ctx): void {}
    public function SetMatch(WorldWondersContext $ctx): void {}
    public function PrePoint(WorldWondersContext $ctx): void {}
    public function PreSpec(WorldWondersContext $ctx): void {}
    public function PreRequest(WorldWondersContext $ctx): void {}
    public function PreResponse(WorldWondersContext $ctx): void {}
    public function PreResult(WorldWondersContext $ctx): void {}
    public function PreDone(WorldWondersContext $ctx): void {}
    public function PreUnexpected(WorldWondersContext $ctx): void {}
}
